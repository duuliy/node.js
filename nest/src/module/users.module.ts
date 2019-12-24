import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../service/users.service';
import { mysqlController } from '../controller/mysql/mysql.controller';
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { User } from '../bean/users.entity';
import { usersProviders } from '../bean/bean.providers';

// console.log(UserService)
@Module({
  imports: [
      DatabaseModule
  ],
  controllers: [mysqlController],
  providers: [
      ...usersProviders,
    UserService,
  ],
  exports: [UserService]
})
export class UserModule {}