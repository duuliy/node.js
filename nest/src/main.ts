// 应用程序入口文件。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionsFilter } from './filtter/httpException.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from './pipe/validation.pipe';
const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const http = require('http');

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/secrets/privkey.key')),
  cert: fs.readFileSync(__dirname + '/secrets/CERTIFICATE.crt'),
};

const server = express();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  //混合应用以下全局设置无效 需要在module中设置
  // app.use(logger);  //全局中间件使用方式
  app.useGlobalFilters(new AllExceptionsFilter()); //全局
  app.setGlobalPrefix('v1'); //url前缀
  app.useGlobalPipes(new ValidationPipe()); //全局类型错误监测
  // app.useGlobalGuards(new RolesGuard());  //全局守卫
  await app.init();
}
bootstrap();
http.createServer(server).listen(3000);
https.createServer(httpsOptions, server).listen(443);
