import Player, { Lane } from "../../entities/player";
import PlayerImage from "../../entities/playerImage";
import { BadRequestError } from "../../errors/BadRequestError";
import { PlayerGateway } from "../../gateways/PlayerGateway";
import { UUIDGeneratorGateway } from "../../gateways/UUIDGeneratorGateway";

export class CreatePlayerUC{
  constructor(
    private db:PlayerGateway,
    private uuid:UUIDGeneratorGateway,
  ){}

  public async execute(input: CreatePlayerInput): Promise<CreatePlayerOutput> {
    try{

      if(
        !input.playerName
        || !input.playerNickname
        || !input.playerLane
        || !input.teamId
      ){
        throw new BadRequestError("some field is empty");
      }

      const newPlayerImage = new PlayerImage(
        input.imageKey,
        input.imageName,
        input.imageSize,
        input.imageUrl,
      );

      const newPlayer = new Player(
        this.uuid.generateUUID(),
        input.playerName,
        input.imageUrl,
        input.playerNickname,
        input.playerLane,
        input.playerSecondaryLane || undefined,
        input.teamId,
      );

      await this.db.createPlayer(newPlayer, newPlayerImage, input.teamId);

      return {
        message: "player successfully created"
      }
    } catch(err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface CreatePlayerInput {
  imageKey: string,
  imageName: string,
  imageSize: number,
  imageUrl: string,
  playerName: string,
  playerNickname: string,
  playerLane: Lane,
  playerSecondaryLane: Lane | undefined,
  teamId: string
}

interface CreatePlayerOutput {
  message: string,
}
