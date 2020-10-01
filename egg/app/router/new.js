'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/news/list', controller.home.index);
};
