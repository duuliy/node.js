import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface ListAllEntities{
  limit:string
}

export interface CreateCatDto{
  limit?:string;
  name: string;
  age: number;
  breed: string;
}


export class UpdateCatDto {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
  }
  
//swgger的介绍 参数大类只能用class，interface接口不行,
export class CreateCatDto2 {
    @ApiProperty({
      description: '名字'
    })
    @IsString()
    readonly name?: string;
  
    @ApiProperty()
    @IsInt()
    readonly age?: number;
  
    @ApiProperty()
    @IsString()
    readonly breed?: string;
  }