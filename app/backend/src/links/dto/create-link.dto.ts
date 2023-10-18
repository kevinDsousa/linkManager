import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UsersEntity } from 'src/users/entities/user.entity';

export class CreateLinkDto {
  @ApiProperty({
    description: 'URl do link',
    example: 'www.google.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  readonly url!: string;

  @ApiProperty({
    description: 'Boolean ativo ou não',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  readonly isActive?: boolean = true;

  @IsNumber()
  @IsNotEmpty()
  user: UsersEntity;
}
