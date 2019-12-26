// 应用程序入口文件。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionsFilter } from './filtter/httpException.filter';
import { ExpressAdapter,NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  //混合应用以下全局设置无效 需要在module中设置
  // app.use(logger);  //全局中间件使用方式
  app.useStaticAssets(join(__dirname, '..', 'public'),{
    prefix: '/static/', //设置虚拟路径
  }) // http://localhost:3000/static/xxx.html
  app.useGlobalFilters(new AllExceptionsFilter()); //全局
  app.setGlobalPrefix('v1'); //url前缀
  app.useGlobalPipes(new ValidationPipe()); //全局类型错误监测
  // app.useGlobalGuards(new RolesGuard());  //全局守卫

  //swgger
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.init();
}
bootstrap();
http.createServer(server).listen(3000);
https.createServer(httpsOptions, server).listen(443);



