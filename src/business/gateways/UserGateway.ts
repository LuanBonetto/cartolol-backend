import User from "../entities/user";

export interface UserGateway {
  getUserByEmail(email: string): Promise<User | undefined>
  getUserByNickname(username: string): Promise<User | undefined>
  signUp(user: User): Promise<void>
  checkIfEmailExists(email: string): Promise<boolean>
  checkIfNicknameExists(nickname: string): Promise<boolean>
}
