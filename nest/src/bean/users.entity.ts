import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'char',
    length: 100
  })
  userName: string;

  @Column('int')
  sex: number;

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

//   @Column()
//   isPublished: boolean;
}
// class Users extends User{

// }
// export {Users}