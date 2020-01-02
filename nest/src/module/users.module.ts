import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../service/users.service';
import { AuthService } from '../service/auth.service';
import { mysqlController } from '../controller/mysql/mysql.controller';
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { User } from '../bean/users.entity';
import { usersProviders } from '../bean/bean.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../middlewares/jwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
      DatabaseModule,
      JwtModule.register({
        secret: 'duuliyKey',
        signOptions: {
          issuer: 'http://localhost/'
        }
      }),
      PassportModule.register({defaultStrategy: 'jwt'})
      // TypeOrmModule.forFeature([User, Platform, Role]),
  ],
  controllers: [mysqlController],
  providers: [
      ...usersProviders,
    UserService,
    AuthService,
    JwtStrategy
  ],
  exports: [UserService,AuthService]
})
export class UserModule {}