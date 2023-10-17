import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from 'src/links/entities/link.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.URL,
  entities: [LinksEntity, UsersEntity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
