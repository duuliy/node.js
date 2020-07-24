import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';


// niddleware实际上等价于 express 中间件
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // console.log(req);
    next();
  }
}