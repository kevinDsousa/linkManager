import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UsersRepository {
  async create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  async findAll() {
    return 'ok';
  }

  async findOne(id: number) {
    return id;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `${id} ${updateUserDto}`;
  }

  async remove(id: number) {
    return id;
  }
  async findByEmail(email: string) {
    return email;
  }
}
