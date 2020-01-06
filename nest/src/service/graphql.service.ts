import { Injectable } from '@nestjs/common';
import { User } from '../classGraphql/graphql';

@Injectable()
export class GraphqlService {
  private readonly users: User[] = [{ id: 1, userName: 'duuliy1',sex:1,height:1,weight:1 }];

//   create(user: User): User {
//     this.users.push(user);
//     return user;
//   }

//   findAll(): User[] {
//     return this.users;
//   }

  async findAll(): Promise<User[]> {
    return await this.users
  }

  findOneById(id: number): User {
    return this.users.find(usr => usr.id === id);
  }

}
