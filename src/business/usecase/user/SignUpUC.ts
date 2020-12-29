import { UserGateway } from "../../gateways/UserGateway";
import User from "../../entities/user";
import { JWTAutenticationGateway } from "../../gateways/JwtAutenticationGateway";
import { BcryptGateway } from "../../gateways/BcryptGateway";
import { UUIDGeneratorGateway } from '../../gateways/UUIDGeneratorGateway';
import { BadRequestError } from "../../errors/BadRequestError";
import { ValidatorGateway } from "../../gateways/ValidatorGateway";
import { MailGateway } from "../../gateways/MaitGateway";

export class SignUpUC {
  constructor(
    private db:UserGateway,
    private JWT:JWTAutenticationGateway,
    private bcript:BcryptGateway,
    private uuid:UUIDGeneratorGateway,
    private validator:ValidatorGateway,
    private mail:MailGateway,
  ){}

  private async validateFields( input: SignUpInput ): Promise<void> {
    if(
      !input.firstname
      || !input.lastname
      || !input.birthDate
      || !input.nickname
      || !input.email
      || !input.password
    ){
      throw new BadRequestError("some field is empty");
    }

    if(!this.validator.isValidTimestamp(input.birthDate)){
      throw new BadRequestError("invalid timestamp in birtDate");
    }

    if(!this.validator.isValidEmail(input.email)){
      throw new BadRequestError("invalid email");
    }

    if(input.nickname.length < 3 || input.nickname.length > 16){
      throw new BadRequestError("nickname must be between 3 and 16 characters");
    }

    if(input.password.length < 8){
      throw new BadRequestError("password needs at least 8 characters");
    }

    const emailExist = await this.db.checkIfEmailExists(input.email);
    if(emailExist){
      throw new BadRequestError("an account already exists with this email");
    }

    const nicknameExist = await this.db.checkIfNicknameExists(input.nickname);
    if(nicknameExist){
      throw new BadRequestError("an account already exists with this nickname");
    }
  }

  public async execute( input: SignUpInput ): Promise<SignUpOutput> {
    try{
      await this.validateFields(input);
      const encryptedPassword = await this.bcript.generateHash(input.password);
      const newID = this.uuid.generateUUID();
      const newUser = new User(
        newID,
        input.firstname,
        input.lastname,
        input.birthDate,
        input.nickname,
        input.email,
        encryptedPassword,
      );

      await this.db.signUp(newUser);

      const userInfo = {
        userId: newID,
        nickname: input.nickname,
        isAdmin: newUser.getIsAdmin(),
        isAuthenticatedEmail: newUser.getIsValidEmail(),
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
  birthDate: number
  nickname: string
  email: string
  password: string
}

interface SignUpOutput {
  message: string,
  token: string,
}
