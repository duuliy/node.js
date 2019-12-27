import { Injectable, Inject,BadRequestException } from '@nestjs/common';
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
    return await this.usersRepository.findOne(id_new);
  }

  async addUser(data: User){
    const user = await this.findOnyById(data.id.toString());
    console.log(user)
    if (user) {
      throw new BadRequestException('用户已存在!');
    }
    return await this.usersRepository.save(data);
  }
}