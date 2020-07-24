import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity() //代表是bean的实体
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn() //代表主键
  readonly id?: number;

  @ApiProperty()
  @Column({ 
    type: 'char',
    length: 100
  })
  readonly userName: string;

  @ApiProperty()
  @Exclude()  //返回值排除此选项
  @Column({ 
    type: 'char',
    length: 100
  })
  readonly password: string;

  @ApiProperty()
  @Column('int')
  readonly sex: number;

  @ApiProperty()
  @Column('int')
  readonly height: number;

  @ApiProperty()
  @Column('int')
  readonly weight: number;

//   @Column()
//   isPublished: boolean;

constructor(partial: Partial<User>) {
  Object.assign(this, partial);
}
}
// class Users extends User{

// }
// export {Users}