import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphqlService } from '../../service/graphql.service';
import { User } from '../../classGraphql/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

// const pubSub = new PubSub()

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly graphqlService: GraphqlService) { 

  }

  @Query()  //users命名必须和users.graphql里面的Query一样,并且必须用post才行,或者默认函数名
  async getUsers() {
    return await this.graphqlService.findAll();
  }

  @Query('user')
  async getUserById(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.graphqlService.findOneById(id);
  }

//   @Mutation('createUser')
//   async create(@Args('createUserInput') user: CreateUserDto): Promise<User> {
//     const createUser = await this.usersService.create(user);
//     pubSub.publish('createUser', { catCreated: createUser });
//     return createUser;
//   }

//   @Mutation('updateUser')
//   async update(@Args('updateUserInput') user: UpdateUserDto): Promise<User> {
//     return await this.usersService.update(user);
//   }

//   @Subscription('userCreated')
//   userCreated() {
//     return pubSub.asyncIterator('userCreated');
//   }
}
