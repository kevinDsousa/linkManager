import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
}
