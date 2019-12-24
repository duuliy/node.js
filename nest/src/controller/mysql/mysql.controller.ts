import {
    Controller,
    Get,
    Param,
    Query
  } from '@nestjs/common';
import { UserService } from '../../service/users.service';
import { User } from '../../bean/users.entity';

@Controller('mysql')
export class mysqlController {
  constructor(private readonly users: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    //   return '666'
    return this.users.findAll();
  }

  @Get('/id')
  async findOneById(@Query() query: User): Promise<User> {
    const id_new=query.id.toString()
    return await this.users.findOnyById(id_new);
  }

}