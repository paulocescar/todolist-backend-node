import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Any } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private readonly jwtService: JwtService) {}

  async validateUser(userDto:UserDto): Promise<any> {
    const acc = await this.usersService.findOne(userDto.username);
    await bcrypt.compare(userDto.password, acc.password).then(res =>{
      const { password, ...result } = acc;
      
      return result;
    })
    return null;
  }
  
  async login(userDto:UserDto) {
    const acc = await this.usersService.findOne(userDto.username);
    return await bcrypt.compare(userDto.password, acc.password).then(res =>{
      const payload = { user: acc.email, sub: acc.username };
      const token = this.jwtService.sign({"userId":acc.id,"payload":payload});
      return {
        "error": 0, "message":"Access Granted!", "token": token,
      };
    }).catch(err => {
      return {"error": 1, "message":err}
    })
  }

  async extractToken(token: string){
    const decoded = await this.jwtService.decode(token)
    return decoded;
  }
}