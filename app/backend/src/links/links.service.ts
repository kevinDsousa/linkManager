import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { LinksEntity } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinksEntity)
    private readonly repository: Repository<LinksEntity>,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    const link = await this.repository.create(createLinkDto);
    return this.repository.save(link);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const links = await this.repository.findOne({
      where: { id },
    });
    if (!links) {
      throw new NotFoundException(`Links id ${id} not found`);
    }
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const links = await this.repository.preload({
      id,
      ...updateLinkDto,
    });
    if (!links) {
      throw new NotFoundException(`Links id ${id} not found`);
    }
    return this.repository.save(links);
  }

  async remove(id: number) {
    const links = await this.repository.findOne({
      where: { id },
    });
    if (!links) {
      throw new NotFoundException(`Links id ${id} not found`);
    }
    return this.repository.remove(links);
  }
}
