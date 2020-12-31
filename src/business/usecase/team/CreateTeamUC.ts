import { TeamDB } from "../../../data/TeamDB";
import Team from "../../entities/team";
import TeamImage from "../../entities/teamImage";
import { BadRequestError } from "../../errors/BadRequestError"
import { UUIDGeneratorGateway } from "../../gateways/UUIDGeneratorGateway";

export class CreateTeamUC {
  constructor(
    private db:TeamDB,
    private uuid:UUIDGeneratorGateway,
  ){}

  public async execute(input: CreateTeamInput): Promise<CreateTeamOutput>{
    try {
      if(!input.teamName){
        throw new BadRequestError("teamName field is required");
      }

      const newTeam = new Team(
        this.uuid.generateUUID(),
        input.teamName,
        input.imageUrl,
        input.championshipId,
      )

      const newImageTeam = new TeamImage(
        input.imageKey,
        input	.imageName,
        input.imageSize,
        input.imageUrl,
      )

      await this.db.createTeam(newTeam, newImageTeam, input.championshipId);

      return {
        message: "team successfully created"
      }
    } catch(err) {
      throw {
        code: err.statusCode || 400,
        message: err.message || "Some error occurred during the request"
      }
    }
  }
}

interface CreateTeamInput {
  imageKey: string,
  imageName: string,
  imageSize: number,
  imageUrl: string,
  teamName: string,
  championshipId: string,
}

interface CreateTeamOutput {
  message: string,
}
