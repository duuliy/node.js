
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
  