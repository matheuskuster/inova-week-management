import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';

import { User } from '@/application/entities';
import { AuthenticateUser } from '@/application/use-cases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticateUser: AuthenticateUser) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    @Req() request: Request,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const { user } = await this.authenticateUser.execute({ email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
