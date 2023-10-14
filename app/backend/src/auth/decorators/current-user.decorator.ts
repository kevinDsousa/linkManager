import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestModel } from '../models/auth-request';
import { UsersEntity } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsersEntity => {
    const request = context.switchToHttp().getRequest<AuthRequestModel>();

    return request.user;
  },
);
