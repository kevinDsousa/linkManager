import { LinksEntity } from 'src/links/entities/link.entity';

export interface UserPayLoad {
  sub: number;
  email: string;
  name: string;
  gravatarUrl: string;
  links: LinksEntity[];
  iat?: number;
  exp?: number;
}
