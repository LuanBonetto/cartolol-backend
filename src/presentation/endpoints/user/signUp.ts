import { Request, Response } from "express";
import { SignUpUC } from '../../../business/usecase/user/SignUpUC';
import { UserDB } from "../../../data/UserDB";
import { JWTAutentication } from "../../../business/helpers/JWTAutentication";
import { BcryptPassword } from "../../../business/helpers/Bcrypt";
import { UUIDGenerator } from '../../../business/helpers/UUID';
import { Validator } from "../../../business/helpers/Validator";
import { Mail } from "../../../business/helpers/Mail";

export const signUpEndpoint = async(req: Request, res: Response) => {
  try{
    const signUpUC = new SignUpUC(
      new UserDB(),
      new JWTAutentication(),
      new BcryptPassword(),
      new UUIDGenerator(),
      new Validator(),
      new Mail()
    );
    const result = await signUpUC.execute({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthDate: req.body.birthDate,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).send(result);
  }catch(err){
    res.status(err.errorCode || 400).send({
      message: err.message
    })
  }
}
