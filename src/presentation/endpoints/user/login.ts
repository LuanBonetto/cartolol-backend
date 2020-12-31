import { Request, Response } from "express";
import { LoginUC } from "../../../business/usecase/user/LoginUC";
import { UserDB } from "../../../data/UserDB";
import { BcryptPassword } from "../../../business/helpers/Bcrypt";
import { JWTAutentication } from "../../../business/helpers/JWTAutentication";
import { Validator } from "../../../business/helpers/Validator";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const loginUC = new LoginUC(
      new UserDB(),
      new BcryptPassword(),
      new JWTAutentication(),
      new Validator()
    );

    const result = await loginUC.execute({
      emailOrNickName: req.body.emailOrNickname,
      password: req.body.password
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err
    });
  }
};
