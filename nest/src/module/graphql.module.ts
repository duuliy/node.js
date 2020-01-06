import { Module } from '@nestjs/common';
import { GraphqlService } from '../service/graphql.service';
import { UsersResolvers } from '../controller/graphql/graphql.controller';


@Module({
  providers: [
    GraphqlService,
    UsersResolvers
  ]
})
export class GraphqlModule {}