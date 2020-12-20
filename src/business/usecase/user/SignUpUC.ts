import { UserGateway } from "../../gateways/UserGateway";
import User from "../../entities/user";
import { JWTAutenticationGateway } from "../../gateways/JwtAutenticationGateway";
import { BcryptGateway } from "../../gateways/BcryptGateway";

export class SignUpUC {
  constructor(
    private db:UserGateway,
    private JWT:JWTAutenticationGateway,
    private bcript:BcryptGateway
  ){}

  public async execute( input: SignUpInput ) {
    try{
      const newUser = new User(
        input.id,
        input.firstname,
        input.lastname,
        input.birthdate,
        input.nickname,
        input.email,
        input.password,
        input.isAdmin
      )

      await this.db.signUp(newUser)

      const userInfo = {
        userId: input.id,
        nickname: input.nickname,
        isAdmin: input.isAdmin
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
  token: string
}
