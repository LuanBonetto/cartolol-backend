import { UserGateway } from "../../gateways/UserGateway";
import User from "../../entities/user";
import { JWTAutenticationGateway } from "../../gateways/JwtAutenticationGateway";
import { BcryptGateway } from "../../gateways/BcryptGateway";
import { UUIDGeneratorGateway } from '../../gateways/UUIDGeneratorGateway';

export class SignUpUC {
  constructor(
    private db:UserGateway,
    private JWT:JWTAutenticationGateway,
    private bcript:BcryptGateway,
    private uuid:UUIDGeneratorGateway,
  ){}

  public async execute( input: SignUpInput ): Promise<SignUpOutput> {
    try{
      const encryptedPassword = await this.bcript.generateHash(input.password);
      const newID = this.uuid.generateUUID();
      const newUser = new User(
        newID,
        input.firstname,
        input.lastname,
        input.birthdate,
        input.nickname,
        input.email,
        encryptedPassword,
      );

      await this.db.signUp(newUser);

      const userInfo = {
        userId: newID,
        nickname: input.nickname,
        isAdmin: newUser.getIsAdmin()
      }

      const token = this.JWT.generateToken(userInfo, process.env.ACCESS_TOKEN_EXPIRES as string)

    return ({
      message: "user successfully registered",
      token: token
    })
    }catch(err){
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface SignUpInput {
  firstname: string
  lastname: string
  birthdate: number
  nickname: string
  email: string
  password: string
}

interface SignUpOutput {
  message: string,
  token: string,
}
