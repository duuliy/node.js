import { Module } from '@nestjs/common';
import { GraphqlService } from '../service/graphql.service';
import { UsersResolvers } from '../controller/graphql/users.resolvers';


@Module({
  providers: [
    GraphqlService,
    UsersResolvers
  ]
})
export class userGraphqlModule {}