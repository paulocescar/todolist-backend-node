import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListDto } from './dto/iist.dto';
import { ListEntity } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
  ) {}

  async create(data: ListDto) {
    const user = this.listRepository.create(data);
    await this.listRepository.save(data);
    return user;
  }

  async findAll() {
    return await this.listRepository.find();
  }

  async findOne(description: string) {
    return await this.listRepository.findOne({
      where: { description: description}
    });
  }

  update(id: number, updateListDto: ListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
