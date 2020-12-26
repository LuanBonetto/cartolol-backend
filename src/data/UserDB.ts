import { UserGateway } from "../business/gateways/UserGateway";
import { BaseDatabase } from "./BaseDatabase";
import User  from "../business/entities/user";
import { BadRequestError } from '../business/errors/BadRequestError';

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
    try {
      await this.connection.insert({
        id: user.getId(),
        firstname: user.getFirstName(),
        lastname: user.getLastName(),
        nickname: user.getNickname(),
        birthDate: user.getBirthDate(),
        password: user.getPassword(),
        email: user.getEmail(),
        isValidEmail: user.getIsValidEmail(),
        isAdmin: user.getIsAdmin()
      }).into(this.userTableName)
    } catch(err) {
      throw new BadRequestError(err)
    }
  }

  public async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const result = await this.connection.raw(`
        SELECT EXISTS(SELECT 1 FROM ${this.userTableName} WHERE email = '${email}') AS 'EXIST';
      `)
      if(!result[0][0].EXIST){
        return false;
      } else {
        return true;
      }
    } catch(err) {
      throw new BadRequestError(err);
    }
  }

  public async checkIfNicknameExists(nickname: string): Promise<boolean> {
    try {
      const result = await this.connection.raw(`
        SELECT EXISTS(SELECT 1 FROM ${this.userTableName} WHERE nickname = '${nickname}') AS 'EXIST';
      `)
      if(!result[0][0].EXIST){
        return false;
      } else {
        return true;
      }
    } catch(err) {
      throw new BadRequestError(err);
    }
  }
}
