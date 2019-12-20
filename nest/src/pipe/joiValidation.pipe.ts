
// // Nest 自带三个开箱即用的管道，即 ValidationPipe，ParseIntPipe 和 ParseUUIDPipe 貌似没啥用
// import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// // 要么返回该值，要么抛出一个错误
// //schema从数据库语言拿  类型验证
// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private readonly schema: Object) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     const { error } = this.schema.validate(value);
//     if (error) {
//       throw new BadRequestException('反回值失败');
//     }
//     return value;
//   }
// }