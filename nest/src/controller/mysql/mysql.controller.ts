import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Body
  } from '@nestjs/common';
import { UserService } from '../../service/users.service';
import { User } from '../../bean/users.entity';
import { ApiHeader,ApiResponse,ApiSecurity } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token'
})
@Controller('mysql')
export class mysqlController {
  constructor(private readonly users: UserService) {}

  @Get()
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

  @Post('/add')
  async addUser(@Body() body: User): Promise<User> {
    return await this.users.addUser(body);
  }

  // addUser

}