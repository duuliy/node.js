import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


//转换类型  最好不要用 存在安全隐患
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}