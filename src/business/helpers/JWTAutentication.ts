import * as jwt from 'jsonwebtoken';
import { JWTAutenticationGateway } from '../gateways/JwtAutenticationGateway';

export class JWTAutentication implements JWTAutenticationGateway {
	generateToken(input: UserInfoForToken, expiresIn: string): string {
		const token = jwt.sign(
			{
				userId: input.userId,
        nickname: input.nickname,
        isAdmin: input.isAdmin,
        isAuthenticatedEmail: input.isAuthenticatedEmail,
        userDevice: input.userDevice,
			},
			process.env.SECRET_KEY as string,
			{
				expiresIn
			}
		);
		return token;
	}

	verifyToken(token: string): UserInfoForToken {
		const result = jwt.verify(token, process.env.SECRET_KEY as string) as UserInfoForToken;

		return {
			userId: result.userId,
      nickname: result.nickname,
      isAdmin: result.isAdmin,
      isAuthenticatedEmail: result.isAuthenticatedEmail,
      userDevice: result.userDevice,
		};
	}
}

export interface UserInfoForToken {
  userId: string;
  nickname: string,
  isAdmin: boolean,
  isAuthenticatedEmail: boolean,
	userDevice?: string;
}
