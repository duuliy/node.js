import { Connection, Repository } from 'typeorm';
import { User } from './users.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];