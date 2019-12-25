import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @ApiProperty()
  @Column({ 
    type: 'char',
    length: 100
  })
  readonly userName: string;

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
}
// class Users extends User{

// }
// export {Users}