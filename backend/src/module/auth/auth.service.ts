import { ForbiddenException, Injectable } from '@nestjs/common';
import { NewUser } from './dto';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from '../database/database.service';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService,
    private jwtService: JwtService
  ) { }


  async signUp(newUser: NewUser): Promise<Token> {


    const hashed_password = await this.hashMaker(newUser.password_hash)
    const user = await this.databaseService.user.create({
      data: {
        email: newUser.email,
        password_hash: hashed_password,
        username: newUser.username,
        role_id: newUser.role_id
      }
    })
    if (user) {
      const tokens = await this.getTokens(user.username, newUser.email, user.role_id, user.user_id)

      await this.updateResfreshToken(user.user_id, tokens.refresh_token)
      return tokens

    }
  }


  async signIn(email: string, password: string): Promise<Token> {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: email
      }
    })
    if (!user) throw new ForbiddenException("Access Denied!!");

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) throw new ForbiddenException("Access Denied!!");

    const tokens = await this.getTokens(user.username, user.email, user.role_id, user.user_id);

    await this.updateResfreshToken(user.user_id, tokens.refresh_token)
    return tokens
  }




  //Helper Functions
  hashMaker(password: string) {
    return bcrypt.hash(password, 10)
  }

  async getTokens(username: string, email: string, role_id: number, user_id: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: user_id,
        username: username,
        email: email,
        role_id: role_id

      }, {
        secret: jwtConstants.access_token_secret,
        expiresIn: 60 * 60 * 24,
      }),
      this.jwtService.signAsync({
        sub: user_id,
        username: username,
        email: email,
        role_id: role_id
      }, {
        secret: jwtConstants.refreh_token_secret,
        expiresIn: 60 * 60 * 24 * 7,
      })

    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }

  }
  async updateResfreshToken(user_id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashMaker(refreshToken)
    await this.databaseService.user.updateMany({
      where: {
        user_id: user_id,
      },
      data: {
        refresh_token: hashedRefreshToken
      }
    })

  }
}
