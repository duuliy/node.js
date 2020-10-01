'use strict';

/** @type Egg.EggPlugin */
// 用于配置需要加载的插件

module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  validate: {
    enable: true,
    package: 'egg-validate',
  },
  watcherChokidar: {
    enable: true,
    package: 'egg-watcher-chokidar',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  }
}


// exports.watcherChokidar = {
//   enable: true,
//   package: 'egg-watcher-chokidar',
// };
