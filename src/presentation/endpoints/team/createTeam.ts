import { Response } from "express";
import { UUIDGenerator } from "../../../business/helpers/UUID";
import { CreateTeamUC } from "../../../business/usecase/team/CreateTeamUC";
import { TeamDB } from "../../../data/TeamDB";

export const createTeamEndpoint = async(req: any, res: Response) => {
  try{
    const createTeamUC = new CreateTeamUC(new TeamDB(), new UUIDGenerator());
    const { originalname: name, size, key, location: url = "" } = req.file;
    const result = await createTeamUC.execute({
      imageKey: key,
      imageName: name,
      imageSize: size,
      imageUrl: url,
      teamName: req.body.teamName,
      championshipId: req.body.championshipId,
    })

    res.status(200).send(result);
  } catch(err){
    res.status(err.code || 400).send({
      message: err.message,
      ...err
    });
  }
}
