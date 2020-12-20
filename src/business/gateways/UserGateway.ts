import User from "../entities/user";

export interface UserGateway {
  getUserByEmail(email: string): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  signUp(user: User): Promise<void>
}
