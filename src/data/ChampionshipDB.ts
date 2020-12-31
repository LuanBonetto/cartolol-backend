import Championship from "../business/entities/championship";
import ChampionshipImage from "../business/entities/championshipImage";
import { ChampionshipGateway } from "../business/gateways/ChampionshipGateway";
import { BaseDatabase } from "./BaseDatabase";

export class ChampionshipDB extends BaseDatabase implements ChampionshipGateway {
  private championshipTableName = "championship";
  private championshipImagesTableName = "championshipImages";

  public async createChampionship(newChampionship: Championship, newChampionshipImage: ChampionshipImage): Promise<void>{
    try {
      await this.connection.insert({
        id: newChampionshipImage.getId(),
        name: newChampionshipImage.getName(),
        size: newChampionshipImage.getSize(),
        url: newChampionshipImage.getUrl(),
      }).into(this.championshipImagesTableName);

      await this.connection.insert({
        id: newChampionship.getId(),
        name: newChampionship.getName(),
        imageId: newChampionshipImage.getId(),
      }).into(this.championshipTableName);
    } catch(err) {
      throw new Error(err);
    }
  }
}
