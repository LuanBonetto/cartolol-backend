import { Response } from "express";
import { UUIDGenerator } from "../../../business/helpers/UUID";
import { CreateChampionshipUC } from "../../../business/usecase/championship/CreateChampionshipUC";
import { ChampionshipDB } from "../../../data/ChampionshipDB";

export const createChampionshipEndpoint = async(req: any, res: Response) => {
  try {
    const createChampionshipUC = new CreateChampionshipUC(new ChampionshipDB(), new UUIDGenerator());
    const { originalname: name, size, key, location: url = "" } = req.file;
    const result = await createChampionshipUC.execute({
      imageKey: key,
      imageName: name,
      imageSize: size,
      imageUrl: url,
      championshipName: req.body.championshipName,
    });

    res.status(200).send(result);
  } catch(err) {
    res.status(err.code || 400).send({
      message: err.message,
      ...err
    });
  }
}
