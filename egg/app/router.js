'use strict';

/**
 * @param {Egg.Application} app - egg application的实例
 */
module.exports = app => {
  const { router, controller } = app;

  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift( 'report' );


  // 路由第二个位置的参数可以让路由单独使用中间件.
  // controller 支持多级目录
  router.get( '/ctest', controller.home.index );
  router.get( '/test', controller.news.list );
  router.get( '/mysqlUser', controller.news.listMysql );
  require( './router/new' )( app );


  // app.on('server', server => {  会将 HTTP server 通过这个事件暴露出来给开发者
  //   console.log(server);
  // });
  // server 通过这个事件暴露出来给开发者
  // error: 运行时有任何的异常被 onerror 插件捕获后
  // request 和 response: 应用收到请求和响应请求时，
  // 分别会触发 request 和 response 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录
};


// 应该和redux的Subscription订阅数据源类似
// const Subscription = require('egg').Subscription;

// class Schedule extends Subscription {
//   // 需要实现此方法
//   // subscribe 可以为 async function 或 generator function
//   async subscribe() {}
// }
