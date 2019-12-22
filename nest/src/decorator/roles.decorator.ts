import { SetMetadata } from '@nestjs/common';

// @SetMetadata() 装饰器将定制元数据附加到路由处理程序的能力
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
