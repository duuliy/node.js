'use strict';

// app/service/news.js
const Service = require( 'egg' ).Service;

class NewsService extends Service {
  async list ( page = 1 ) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    //对外部服务器的请求方式
    const { data: idList } = await this.ctx.curl( `${ serverUrl }/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${ pageSize * ( page - 1 ) }"`,
        endAt: `"${ pageSize * page - 1 }"`,
      },
      dataType: 'json',
    } );

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys( idList ).map( key => {
        const url = `${ serverUrl }/item/${ idList[ key ] }.json`;
        return this.ctx.curl( url, { dataType: 'json' } );
      } )
    );
    return newsList.map( res => res.data );
  }

  async listMysql ( userName ) {
    const user = await this.app.mysql.get( 'user', { userName } );
    return { user };

  }
}

module.exports = NewsService;
