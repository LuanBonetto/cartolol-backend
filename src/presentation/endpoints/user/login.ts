import { Request, Response } from "express";
import { LoginUC } from "../../../business/usecase/user/Login";
import { UserDB } from "../../../data/UserDB";
import { BcryptPassword } from "../../../business/helpers/Bcrypt";
import { JWTAutentication } from "../../../business/helpers/JWTAutentication";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const loginUC = new LoginUC(new UserDB(), new BcryptPassword(), new JWTAutentication());

    const result = await loginUC.execute({
      login: req.body.email,
      password: req.body.password
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
