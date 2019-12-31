import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Body,
    UseGuards
  } from '@nestjs/common';
import { UserService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../bean/users.entity';
import { ApiHeader,ApiResponse,ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token'
})
@Controller('mysql')
export class mysqlController {
  constructor(
    private readonly users: UserService,
    private readonly authService: AuthService
    ) {}

  @Get()
  @UseGuards(AuthGuard())
  getHello(): Promise<User[]> {
    //   return '666'
    return this.users.findAll();
  }

  @Get('/id')
  @ApiSecurity('basic')
  @ApiResponse({ status: 200, description: 'sucess.'})
  async findOneById(@Query() query: User): Promise<User> {
    const id_new=query.id.toString()
    return await this.users.findOnyById(id_new);
  }

  @Get('/userName')
  @ApiSecurity('basic')
  @ApiResponse({ status: 200, description: 'sucess.'})
  async findOneName(@Query() query: User): Promise<User> {
    return await this.users.findOneName(query.userName);
  }

  @Post('/add')
  async addUser(@Body() body: User): Promise<User> {
    return await this.users.addUser(body);
  }

  @Post('getToken')
  async getTokenByUserId(
      @Body('userName') userName: string,
      @Body('password') password: string
  ){
    return await this.authService.createToken(userName, password);
  }

  // addUser

}