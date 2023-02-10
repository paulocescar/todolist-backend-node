import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userDto:UserDto): Promise<any> {
    const acc = await this.authService.validateUser(userDto);
    if (!acc) {
      throw new UnauthorizedException();
    }
    console.log("Acc ", acc)
    return acc;
  }
}