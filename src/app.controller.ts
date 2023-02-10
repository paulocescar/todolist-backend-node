import { Controller, Get, Request, Post, UseGuards, Body, Param, Headers } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UserDto } from './users/dto/user.dto'

@Controller()
export class AppController {
  constructor(private authService: AuthService,
    private usersService: UsersService){}

  @UseGuards(LocalStrategy)
  @Post('auth/login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Headers() headers) {
    const acc_id = await this.authService.extractToken(headers.authorization.replace('Bearer ','')).then(res => {
      return res
    });
    const players = await this.usersService.find(acc_id["userId"])
    return players;
  }
  
}
