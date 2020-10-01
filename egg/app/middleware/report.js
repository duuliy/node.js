'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const startTime = Date.now();
    await next();
    // 上报请求时间
    return Date.now() - startTime;
  };
};
