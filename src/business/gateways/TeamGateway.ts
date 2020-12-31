import Team from "../entities/team";
import TeamImage from "../entities/teamImage";

export interface TeamGateway {
  createTeam(newTeam: Team, newImageTeam: TeamImage, championshipId: string): Promise<void>
}
