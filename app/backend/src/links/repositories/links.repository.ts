import { CreateLinkDto } from '../dto/create-link.dto';
import { UpdateLinkDto } from '../dto/update-link.dto';

export class LinksRepository {
  constructor(private readonly repository: LinksRepository) {}

  async create(createLinkDto: CreateLinkDto) {
    return `This action adds a new link ${createLinkDto}`;
  }

  async findAll() {
    return `This action returns all links`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link ${updateLinkDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
