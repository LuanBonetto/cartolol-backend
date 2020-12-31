import Player from "../business/entities/player";
import PlayerImage from "../business/entities/playerImage";
import { PlayerGateway } from "../business/gateways/PlayerGateway";
import { BaseDatabase } from "./BaseDatabase";

export class PlayerDB extends BaseDatabase implements PlayerGateway {
  private imagesPlayersTableName = "playerImages";
  private playersTableName = "players";

  public async createPlayer(newPlayer: Player, newImagePlayer: PlayerImage, teamId: string): Promise<void>{
    try {
      await this.connection.insert({
        id: newImagePlayer.getId(),
        name: newImagePlayer.getName(),
        size: newImagePlayer.getSize(),
        url: newImagePlayer.getUrl(),
      }).into(this.imagesPlayersTableName);

      await this.connection.insert({
        id: newPlayer.getId(),
        name: newPlayer.getName(),
        nickname: newPlayer.getNickname(),
        lane: newPlayer.getLane(),
        secondaryLane: newPlayer.getSecondaryLane(),
        imageId: newImagePlayer.getId(),
        teamId,
      }).into(this.playersTableName);
    } catch(err){
      throw new Error(err);
    }
  }
}
