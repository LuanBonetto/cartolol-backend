import { ChampionshipDB } from "../../../data/ChampionshipDB";
import Championship from "../../entities/championship";
import championshipImage from "../../entities/championshipImage";
import { BadRequestError } from "../../errors/BadRequestError"
import { UUIDGeneratorGateway } from "../../gateways/UUIDGeneratorGateway";

export class CreateChampionshipUC {
  constructor(
    private db:ChampionshipDB,
    private uuid:UUIDGeneratorGateway,
  ){}

  public async execute(input: CreateChampionshipInput): Promise<CreateChampionshipOutput> {
    try {
      if(!input.championshipName){
        throw new BadRequestError("championshipName field is required");
      }

      const newChampionship = new Championship(
        this.uuid.generateUUID(),
        input.championshipName,
        input.imageUrl,
      );

      const newChampionshipImage = new championshipImage(
        input.imageKey,
        input.imageName,
        input.imageSize,
        input.imageUrl,
      );

      await this.db.createChampionship(newChampionship, newChampionshipImage);

      return {
        message: "championship created successfully",
      }
    } catch(err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface CreateChampionshipInput {
  imageKey: string,
  imageName: string,
  imageSize: number,
  imageUrl: string,
  championshipName: string,
}

interface CreateChampionshipOutput {
  message: string,
}
