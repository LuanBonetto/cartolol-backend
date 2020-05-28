import { UserGateway } from "../../gateways/UserGateway";
import { BcryptGateway } from "../../gateways/BcryptGateway";
import { JWTAutenticationGateway } from "../../gateways/JwtAutenticationGateway";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";

export class LoginUC {
    constructor(
        private userGateway: UserGateway,

        private bcrypt: BcryptGateway,

        private jwt: JWTAutenticationGateway,

        ) { }

    public async execute(input: LoginUCInput): Promise<LoginUCOutput> {
        try {

            let user 

            if (input.login.indexOf("@") === 1) {

                user =  await this.userGateway.getUserByEmail(input.login);
            }

                user = await this.userGateway.getUserByUsername(input.login);


            if(!user){
                throw new NotFoundError("user not found")
            }
            const isPasswordCorrect = await this.bcrypt.compareHash(input.password, user.getPassword());

            if (!isPasswordCorrect) {
                throw new BadRequestError("incorrect password")
            }

            const token = this.jwt.generateToken({userId: user.getId()}, process.env.ACCESS_TOKEN_EXPIRES as string);

            return {
                message: "Usuário logado com sucesso",
                token
              }
        } catch (err) {
            throw {
				code: err.statusCode || 400,
				message: err.message || 'An error occurred during login'
			};
        }
    }
}

export interface LoginUCInput {
    login: string;
    password: string
}

export interface LoginUCOutput {
    message: string;
    token: string
}
