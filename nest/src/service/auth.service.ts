import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findOneName(userName);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createToken(userName: string,password: string) {
    const payload = { userName,password }
    const user = await this.validateUser(userName,password); 
    if (!user) throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: '找不到',
    }, 403);
    return {
      access_token: this.jwtService.sign(payload,{
        expiresIn:60*60 // 过期时间
        // algorithm:'RS256', // default是HMAC SHA256，也可以指定別的
      }),
    };
  }
}