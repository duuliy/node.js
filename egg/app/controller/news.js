'use strict';
// app/controller/news.js
const Controller = require( 'egg' ).Controller;

class NewsController extends Controller {
  async list () {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list( page );
    await ctx.render( 'news/list.tpl', { list: newsList } );
  }

  async listMysql () {
    const ctx = this.ctx;
    const userName = ctx.query.userName || '';
    const newsList = await ctx.service.news.listMysql( userName );
    ctx.body = newsList;
  }
}

module.exports = NewsController;
