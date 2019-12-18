// 带有单个路由的基本控制器示例
import { 
  Controller, 
  Get, 
  Req, 
  Post ,
  HttpCode,
  Header,
  Redirect,
  Param,
  Query,
  Body,
  Put,
  Delete
} from '@nestjs/common';
import {
  ListAllEntities,
  CreateCatDto,
  UpdateCatDto
} from './app.interface'
import { AppService } from '../../service/app.service';
import { Request,Response  } from 'express';

//Async / await 支持

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //不推荐不好用
  @Get('Params:id')
  findAll(@Param('id') id:string): string {
    return `This action returns all cats #${id}`
  }

  @Get('Params')
  findAll2(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }
  
}

@Controller('cats2')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats2';
  }

  //不推荐不好用
  @Get(':id')
  findAll3(@Param() Param): string {
    console.log(Param)
    return `This action returns all cats #${Param.id}`
  }
  

  //重定向
  @Get('666')
  @Redirect('https://www.baidu.com', 301)
  findAll2(@Req() request: Request): string {
    return '重定向';
  }

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return '这是post';
  }
  
}

@Controller('fourTest')
export class testController {

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  
}


