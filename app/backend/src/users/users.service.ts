import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = this.repository.create({
      ...userData,
      password: hashedPassword,
    });
    return this.repository.save(newUser);
  }

  async findAll() {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.links', 'links')
      .getMany();
  }

  async findOne(id: number) {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.links', 'links')
      .where('user.id = :id', { id })
      .getOne();
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
