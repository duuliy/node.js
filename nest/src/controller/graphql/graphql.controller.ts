import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphqlService } from '../../service/graphql.service';
import { User } from '../../classGraphql/graphql';
import { PubSub } from 'graphql-subscriptions';

// const pubSub = new PubSub()

@Resolver('Users')
export class UsersResolvers {
  constructor(private readonly graphqlService: GraphqlService) { }

  @Query('users')  //users命名必须和users.graphql里面的Query一样,并且必须用post才行
  async getUsers(): Promise<User[]> {
      console.log(666)
    return await this.graphqlService.findAll();
  }

  @Query('user')
  async getUserById(@Args('id', ParseIntPipe) id: number): Promise<User> {
    console.log(id)
    return await this.graphqlService.findOneById(id);
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
