import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Chico Ronilindju',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'chico.ronilindju@gmail.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  readonly gravatarUrl?: string;

  @IsBoolean()
  readonly admin?: boolean;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'FS11melhorturma',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
