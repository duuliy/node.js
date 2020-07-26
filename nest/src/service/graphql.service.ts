import { Injectable } from '@nestjs/common';
import { User } from '../classGraphql/graphql.schema';
import {UserService} from './users.service'
const axios = require('axios');

const TARGET_SERVER='http://localhost:3000/v1/' //放在公共区域或proxy
@Injectable()
export class GraphqlService {
  private readonly users: User[] = [{ id: 1, userName: 'duuliy1',sex:1,height:1,weight:1 }];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

   async findAll(): Promise<User[]> {
    const body=await axios.get(`${TARGET_SERVER}mysql`).then(resp => {
        // console.log('statusCode:', resp.status); // 返回请求的状态码
        // console.log('body:', resp.data); // 返回回来的数据
        //这里可以调用多个接口聚合数据
        return resp.data
    })
    return body
  }

  async findOneById(id: number): Promise<User> {
    // return this.users.find(usr => usr.id === id);
    const body=await axios.get(`${TARGET_SERVER}mysql/id?id=${id}`).then(resp => {
      // console.log('statusCode:', resp.status); // 返回请求的状态码
      // console.log('body:', resp.data); // 返回回来的数据
      //这里可以调用多个接口聚合数据
      return resp.data
  })
  return body
  }

}
