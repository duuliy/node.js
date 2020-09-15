'use strict';

const Controller = require('egg').Controller;

// ctx context的实例
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 获取参数
    // console.log(ctx.request.query);
    // console.log(ctx.request.body);
    // ctx.response.body  接口返回值
    console.log(ctx.helper.formatUser2); // Helper 用来提供一些实用的 utility 函数
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
