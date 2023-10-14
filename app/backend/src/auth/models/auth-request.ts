import { Request } from 'express';
import { UsersEntity } from 'src/users/entities/user.entity';

export interface AuthRequestModel extends Request {
  user: UsersEntity;
}
