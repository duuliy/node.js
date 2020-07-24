import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';  //此流包含从路由处理程序返回的值
import { tap,map } from 'rxjs/operators';

//拦截器 intercept 这里处理json
// ExecutionContext传递给原始处理程序的参数的一个包装
// CallHandler 包装执行流的对象
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()  //由于 handle() 返回一个RxJS Observable
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),  //该运算符在可观察序列的正常或异常终止时调用函数,接口调用时间
      );
  }
}