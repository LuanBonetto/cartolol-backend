import { Request, Response } from "express";
import { SignUpUC } from '../../../business/usecase/user/SignUpUC';
import { UserDB } from "../../../data/UserDB";
import { JWTAutentication } from "../../../business/services/JWTAutentication";
import { BcryptPassword } from "../../../business/services/Bcrypt";
import { UUIDGenerator } from '../../../business/services/UUID';

export const signUpEndpoint = async(req: Request, res: Response) => {
  try{
    const signUpUC = new SignUpUC(new UserDB(), new JWTAutentication(), new BcryptPassword(), new UUIDGenerator());
    const result = await signUpUC.execute({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate,
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
