import { Injectable,Optional,
  Inject } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface'


// type Cat=number
// @Injectable() //貌似只能告诉nest是个提供者，有无不影响功能

@Injectable()
export class AppService<T> {
  constructor(
    //可选的  //自定义标记
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}

  getHello(): string {
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
