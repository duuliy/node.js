'use strict';

const Controller = require('egg').Controller;

// ctx context的实例
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 获取参数
    // params 获取 /test:id  的传参方式
    // console.log(ctx.request.query);
    // console.log(ctx.request.body);
    // ctx.response.body  接口返回值
    // console.log(ctx.helper.formatUser2); // Helper 用来提供一些实用的 utility 函数

    // const creatRule = {
    //   name: 'string',
    // };
    // console.log(ctx.query.name);
    // console.log(ctx);
    ctx.validate({ name: 'string' }, ctx.query); // 422代表验证不通过
    // const author = ctx.session.userId;  获取session
    ctx.body = `hi, ${ctx.query.name}`;
  }
}

module.exports = HomeController;
