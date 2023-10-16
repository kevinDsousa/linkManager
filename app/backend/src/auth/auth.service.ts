import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserPayLoad } from './models/user-payload';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<UserToken> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const payload: UserPayLoad = {
          sub: user.id,
          email: user.email,
          name: user.name,
          gravatarUrl: user.gravatarUrl,
          links: [],
        };
        const jwtToken = this.jwtService.sign(payload);

        return {
          access_token: jwtToken,
        };
      }
    }
    throw new UnauthorizedException('Email e/ou senha incorretos');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordvalid = await bcrypt.compare(password, user.password);
      if (isPasswordvalid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email e ou senha incorreta');
  }
}
