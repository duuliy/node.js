import { 
    Controller, 
    Get, 
    HttpException,
    HttpStatus,
    UseFilters
  } from '@nestjs/common';
import {HttpExceptionFilter} from '../../filtter/httpException.filter'
//异常处理


@UseFilters(new HttpExceptionFilter())
@Controller('error')
export class ErrorController extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get()
  async findAll() {
    throw new ErrorController();
  }

  @Get('2')
  async error() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, 403);
  }
}
