// 带有单个路由的基本控制器示例
import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Param,
  Query,
  Body,
  Put,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ListAllEntities,
  CreateCatDto,
  UpdateCatDto,
  CreateCatDto2,
} from './app.interface';
import { AppService, CatsService } from '../../service/app.service';
import { Request, Response } from 'express';
import { Cat } from '../../interfaces/cat.interface';
import { User } from '../../decorator/user.decorator';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { RolesGuard } from '../../middlewares/roles.guard';
import { Roles } from '../../decorator/roles.decorator';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';

// CatsService

//Async / await 支持

@Controller()
export class AppController {
  constructor(private readonly appService: AppService<any>) {}

  @Get()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(new ValidationPipe()) //ts被转化了不加管道不能服务器控制台报错,要bean完全正确才能调用成功
  async create(@Body() CreateCatDto2: CreateCatDto2) {
    return `This action returns all cats #${CreateCatDto2.name}`;
  }

  //不推荐不好用
  @Get('Params:id')
  findAll(@Param('id') id: string): string {
    return `This action returns all cats #${id}`;
  }

  @Get('Params')
  findAll2(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get('findAll3')
  findAll3(@Res() res: Response) {
    //HttpStatus的创建命令201，但是官方建议最好不要用。
    res.status(HttpStatus.CREATED).send();
  }

}

@Controller('cats2')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    // return 'This action returns all cats2';
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      403,
    );
  }

  @Get('decorator')
  async findOne(@User('firstName') firstName: string) {
    // 访问以下特定属性
    console.log(`Hello ${firstName}`);
    return `Hello ${firstName}`
  }

  //不推荐不好用
  @Get(':id')
  findAll3(@Param() Param): string {
    return `This action returns all cats #${Param.id}`;
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
@UseGuards(RolesGuard)
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

@Controller('car')
export class CarController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Roles('admin')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
