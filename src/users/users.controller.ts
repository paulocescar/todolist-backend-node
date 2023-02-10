import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 4;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() userDto: UserDto) {
    try {
      userDto.password = await bcrypt.hash(userDto.password, saltOrRounds);
      const user = await this.usersService.create(userDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
        user
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
      const allUsers = await this.usersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'List Users successfully',
        data: allUsers
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: error.sqlMessage
      }
    }
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    return await this.usersService.update(+id, userDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
