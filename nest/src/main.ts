// 应用程序入口文件。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger);  //全局中间件使用方式
  await app.listen(3000);
}
bootstrap();
