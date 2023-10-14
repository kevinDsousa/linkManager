import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksEntity } from './entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinksEntity])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
