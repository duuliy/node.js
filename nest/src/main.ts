// 应用程序入口文件。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionsFilter,HttpExceptionFilter } from './filtter/httpException.filter';
import { ExpressAdapter,NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';


const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const redis = require("redis");   //https和缓存都运维来
// const client = redis.createClient();

// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });


const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/secrets/privkey.key')),
  cert: fs.readFileSync(__dirname + '/secrets/CERTIFICATE.crt'),
};

const server = express();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, 
  new ExpressAdapter(server),{
    // logger: ['error', 'warn']  //日志类型
  });
  //混合应用以下全局设置无效 需要在module中设置
  // app.use(logger);  //全局中间件使用方式
  app.useStaticAssets(join(__dirname, '..', 'public'),{
    prefix: '/static/', //设置虚拟路径
  }) // http://localhost:3000/static/xxx.html
  app.useGlobalFilters(new HttpExceptionFilter()); //全局
  app.setGlobalPrefix('v1'); //url前缀
  app.useGlobalPipes(new ValidationPipe()); //全局类型错误监测
  // app.useGlobalGuards(new RolesGuard());  //全局守卫
  app.use(compression())  //压缩代码
  app.use(helmet())  //过适当地设置 HTTP 头，保护您的应用免受一些众所周知的 Web 漏洞的影响  安全
  // app.enableCors()  //允许跨域
  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(cookieParser())
  // app.use(csurf({ cookie: true }))  //防止跨站点请求伪造cookie那套
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 每个窗口最多限制100个请求
    }),
  );  //限速防止暴力攻击

  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
  
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
  })

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



