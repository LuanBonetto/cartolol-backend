import Player from "../entities/player";
import PlayerImage from "../entities/playerImage";

export interface PlayerGateway {
  createPlayer(newPlayer: Player, newImagePlayer: PlayerImage, teamId: string): Promise<void>
}
