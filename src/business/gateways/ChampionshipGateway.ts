import Championship from "../entities/championship";
import ChampionshipImage from "../entities/championshipImage";

export interface ChampionshipGateway {
  createChampionship(newChampionship: Championship, newChampionshipImage: ChampionshipImage): Promise<void>
}
