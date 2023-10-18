export interface UserPayLoad {
  sub: number;
  email: string;
  name: string;
  gravatarUrl: string;
  admin: boolean;
  iat?: number;
  exp?: number;
}
