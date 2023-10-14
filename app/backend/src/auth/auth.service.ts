import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserPayLoad } from './models/user-payload';
import { UserToken } from './models/user-token';
import { UsersEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UsersEntity): UserToken {
    const payload: UserPayLoad = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findbyEmail(email);

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
