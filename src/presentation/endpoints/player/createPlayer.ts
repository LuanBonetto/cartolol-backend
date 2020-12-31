import { Response } from "express";
import { UUIDGenerator } from "../../../business/helpers/UUID";
import { CreatePlayerUC } from "../../../business/usecase/player/CreatePlayerUC";
import { CreateTeamUC } from "../../../business/usecase/team/CreateTeamUC";
import { PlayerDB } from "../../../data/PlayerDB";
import { TeamDB } from "../../../data/TeamDB";

export const createPlayerEndpoint = async(req: any, res: Response) => {
  try{
    const createPlayerUC = new CreatePlayerUC(new PlayerDB(), new UUIDGenerator());
    const { originalname: name, size, key, location: url = "" } = req.file;
    const result = await createPlayerUC.execute({
      imageKey: key,
      imageName: name,
      imageSize: size,
      imageUrl: url,
      playerName: req.body.playerName,
      playerNickname: req.body.playerNickname,
      playerLane: req.body.playerLane,
      playerSecondaryLane: req.body.playerSecondaryLane,
      teamId: req.body.teamId,
    })

    res.status(200).send(result);
  } catch(err){
    res.status(err.code || 400).send({
      message: err.message,
      ...err
    });
  }
}
