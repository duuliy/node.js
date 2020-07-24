import { createParamDecorator } from '@nestjs/common';

//自定义req装饰器
export const User = createParamDecorator((data: string, req) => {
  return data ? req.body.user && req.body.user[data] : '错误的';
});