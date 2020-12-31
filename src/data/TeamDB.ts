import Team from "../business/entities/team";
import TeamImage from "../business/entities/teamImage";
import { TeamGateway } from "../business/gateways/TeamGateway";
import { BaseDatabase } from "./BaseDatabase";

export class TeamDB extends BaseDatabase implements TeamGateway {
  private teamImagesTableName = "teamImages";
  private teamTableName = "team";

  public async createTeam(newTeam: Team, newImageTeam: TeamImage, championshipId: string): Promise<void> {
    try {
      await this.connection.insert({
        id: newImageTeam.getId(),
        name: newImageTeam.getName(),
        size: newImageTeam.getSize(),
        url: newImageTeam.getUrl(),
      }).into(this.teamImagesTableName);

      await this.connection.insert({
        id: newTeam.getId(),
        name: newTeam.getName(),
        imageId: newImageTeam.getId(),
        championshipId,
      }).into(this.teamTableName);

    } catch(err) {
      throw new Error(err);
    }
  }
}
