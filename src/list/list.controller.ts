import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/iist.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }

  @Post()
  create(@Body() createListDto: ListDto) {
    try {
      this.listService.create(createListDto);
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
  findAll() {
    const allList = this.listService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      allList
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: ListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
