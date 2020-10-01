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


  return {
    ...config,
    ...userConfig,
  };
};
