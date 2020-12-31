import { UserGateway } from "../../gateways/UserGateway";
import { BcryptGateway } from "../../gateways/BcryptGateway";
import { JWTAutenticationGateway } from "../../gateways/JwtAutenticationGateway";
import { ValidatorGateway } from "../../gateways/ValidatorGateway";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export class LoginUC {
  constructor(
    private userGateway: UserGateway,
    private bcrypt: BcryptGateway,
    private jwt: JWTAutenticationGateway,
    private validator: ValidatorGateway,
  ) {}

  public async execute(input: LoginUCInput): Promise<LoginUCOutput> {
    try {
      let user = undefined;

      if (this.validator.isValidEmail(input.emailOrNickName)) {
        user =  await this.userGateway.getUserByEmail(input.emailOrNickName);
      } else{
        user = await this.userGateway.getUserByNickname(input.emailOrNickName);
      }

      if(!user){
        throw new UnauthorizedError("user not found");
      }

      const isPasswordCorrect = await this.bcrypt.compareHash(input.password, user.getPassword());

      if (!isPasswordCorrect) {
        throw new UnauthorizedError("incorrect password")
      }
      const userInfo = {
        userId: user.getId(),
        nickname: user.getNickname(),
        isAdmin: user.getIsAdmin(),
        isAuthenticatedEmail: user.getIsValidEmail(),
      }
      const token = this.jwt.generateToken(userInfo, process.env.ACCESS_TOKEN_EXPIRES as string);

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
  emailOrNickName: string;
  password: string
}

export interface LoginUCOutput {
  message: string;
  token: string
}
