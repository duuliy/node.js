import { Module } from '@nestjs/common';
import { databaseProviders } from './mysql.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}