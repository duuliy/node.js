// 应用程序的根模块。
import { Module } from '@nestjs/common';
import { AppController,CatsController } from '../controller/app/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController,CatsController],
  providers: [AppService],
})
export class AppModule {}
