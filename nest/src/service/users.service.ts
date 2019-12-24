import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../bean/users.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOnyById(id: string): Promise<User> {
      const id_new=Number(id)
      const cc=await this.usersRepository.findOne(id_new);
      console.log(cc)
    return await this.usersRepository.findOne(id_new);
  }
}