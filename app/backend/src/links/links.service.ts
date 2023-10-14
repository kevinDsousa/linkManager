import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksRepository } from './repositories/links.repository';

@Injectable()
export class LinksService {
  constructor(private readonly repository: LinksRepository) {}

  async create(createLinkDto: CreateLinkDto) {
    return this.repository.create(createLinkDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    return this.repository.update(id, updateLinkDto);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}
