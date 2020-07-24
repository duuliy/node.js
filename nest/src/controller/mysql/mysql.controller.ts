import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Body,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    UploadedFile,
    UploadedFiles,
    DynamicModule
  } from '@nestjs/common';
import { UserService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../bean/users.entity';
import { ApiHeader,ApiResponse,ApiSecurity, ApiConsumes,ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor,FilesInterceptor,FileFieldsInterceptor } from '@nestjs/platform-express';
import multer = require('multer');

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token'
})
@Controller('mysql')
export class mysqlController {
  constructor(
    private readonly users: UserService,
    private readonly authService: AuthService
    ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)  //调用排除返回的User
  // @UseGuards(AuthGuard())
  getHello(): Promise<User[]> {
    //   return '666'
    return this.users.findAll();
  }

  @Get('/id')
  @ApiSecurity('basic')
  @ApiResponse({ status: 200, description: 'sucess.'})
  async findOneById(@Query() query: User): Promise<User> {
    const id_new=query.id.toString()
    return await this.users.findOnyById(id_new);
  }

  @Get('/userName')
  @ApiSecurity('basic')
  @UseGuards(AuthGuard()) //也可以全局用
  @ApiResponse({ status: 200, description: 'sucess.'})
  async findOneName(@Query() query: User): Promise<User> {
    return await this.users.findOneName(query.userName);
  }

  @Post('/add')
  async addUser(@Body() body: User): Promise<User> {
    return await this.users.addUser(body);
  }

  @Post('getToken')
  async getTokenByUserId(
      @Body('userName') userName: string,
      @Body('password') password: string
  ){
    return await this.authService.createToken(userName, password);
  }

  //上传文件
  //UploadedFile 单个
  //UploadedFiles 多个 数组
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files',5,  //名字 最大个数 回调函数
  {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, './public/uploads');
          
      },
      filename: (req, file, cb) => {
        //可以做验证
          cb(null, file.originalname);
      },
  }),
  }
  ))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        }
      },
    },
  })
  uploadFile(@UploadedFiles() files) {
    // console.dir(MulterModule.register)
    console.log(files);
    return {
      body:'上传成功!'
    }
  }

}