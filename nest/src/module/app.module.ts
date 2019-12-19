// 应用程序的根模块。
import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController,CatsController,CarController } from '../controller/app/app.controller';
import { AppService,CatsService } from '../service/app.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';


//牛逼的是有错误不得导致程序崩溃

// forRoot() 可以同步或异步（Promise）返回动态模块
// MiddlewareConsumer它提供了几种内置方法来管理中间件。他们都可以被简单地链接起来

// @Global()  //全局共享server
@Module({
  imports: [], //导入模块的列表
  controllers: [AppController,CatsController,CarController],
  providers: [AppService,CatsService],
  exports:[] // 由本模块提供并应在其他模块中可用的提供者的子集。
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {  //设置中间件
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: '*', method: RequestMethod.ALL }); //全局
      .forRoutes(AppController);

      // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController); // 多个中间件
  }
}
