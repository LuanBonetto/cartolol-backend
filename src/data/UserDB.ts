import { UserGateway } from "../business/gateways/UserGateway";
import { BaseDatabase } from "./BaseDatabase";
import User  from "../business/entities/user";


export class UserDB extends BaseDatabase implements UserGateway {

  private userTableName = "users";

  private mapDBDataToUser(input: any): User {
	  return new User(
      input.id,
      input.firstname,
      input.lastname,
      input.birthDate,
      input.username,
      input.email,
      input.password,
      input.admin)
    ;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(
      `SELECT * FROM ${this.userTableName} WHERE email='${email}'`
    );

    if (!result[0][0]) {
      return undefined
    }

    return result[0][0] && this.mapDBDataToUser(result[0][0]);
  }


  public async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.connection.raw(
      `SELECT * FROM ${this.userTableName} WHERE username='${username}'`
    );

    if (!result[0][0]) {
      return undefined
    }


    return result[0][0] && this.mapDBDataToUser(result[0][0]);
  }

  public async signUp(user: User): Promise<void> {
    await this.connection.insert({
      id: user.getId(),
      firstname: user.getFirstName(),
      lastname: user.getLastName(),
      nickname: user.getNickname(),
      birthDate: user.getBirthDate(),
      password: user.getPassword(),
      email: user.getEmail(),
      isAdmin: user.getIsAdmin()
    }).into(this.userTableName)
  }
}
