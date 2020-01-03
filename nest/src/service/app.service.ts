import { Injectable,Optional,
  Inject } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface'
import { WsGateway } from './ws.getaway';

//生命周期
// OnModuleInit	初始化主模块后调用
// OnApplicationBootstrap	在应用程序完全启动并引导后调用
// OnModuleDestroy	在Nest销毁主模块(app.close()方法之前进行清理)
// OnApplicationShutdown	响应系统信号(当应用程序关闭时，例如SIGTERM)

// type Cat=number
// @Injectable() //貌似只能告诉nest是个提供者，有无不影响功能

@Injectable()
export class AppService<T> {
  constructor(
    //可选的  //自定义标记
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T,
    private readonly wsGateway:WsGateway
  ) {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  getHello(): string {
    this.wsGateway.wss.emit('idea' ,666)
    return 'Hello World!';
  }

}

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
