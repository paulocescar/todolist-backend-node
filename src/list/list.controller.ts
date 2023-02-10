import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/iist.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }

  @Post()
  async create(@Body() createListDto: ListDto) {
    try {
      await this.listService.create(createListDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Item List created successfully',
      }

    } catch (error) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: error.sqlMessage
      }
    }
  }

  @Get()
  async findAll() {
    try {
      const allList = await this.listService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Get list.',
        data: allList
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: error.sqlMessage
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.listService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListDto: ListDto) {
    return await this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.listService.remove(+id);
  }
}
