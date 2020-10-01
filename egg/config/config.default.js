/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599533994275_6035';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  config.middleware = [
    'robot',
  ];
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  config.middleware = [ 'gzip' ];

  // 配置 gzip 中间件的配置
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };


  config.env = 'prod';

  config.validate = {
    // convert: false, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false, // 限制被验证值必须是一个对象。
  };

  config.watcherChokidar = {
    usePolling: true,
    alwaysStat: true,
  };

  // config.errorPageUrl= '/50x.html'  报错异常跳转的页面

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'springboottest',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.proxy = true;  //获取用户真是ip

  return {
    ...config,
    ...userConfig,
  };
};
