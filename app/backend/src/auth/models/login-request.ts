import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'chico.ronilindju@gmail.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '*******',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
