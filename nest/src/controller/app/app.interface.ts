import { IsString, IsInt } from 'class-validator';

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
  

export class CreateCatDto2 {
    @IsString()
    readonly name?: string;
  
    @IsInt()
    readonly age?: number;
  
    @IsString()
    readonly breed?: string;
  }