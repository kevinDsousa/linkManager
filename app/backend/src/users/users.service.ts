import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async findbyEmail(email: string) {
    return email;
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Users id ${id} not found`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Users id ${id} not found`);
    }
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Users id ${id} not found`);
    }
    return this.repository.remove(user);
  }
}
