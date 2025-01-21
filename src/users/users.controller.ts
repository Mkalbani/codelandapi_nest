import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GetUserParamDto } from 'src/users/dtos/getUser-params.dto';
import { EditUserDto } from 'src/users/dtos/patch-user.dto';
import { UserService } from './providers/users.services';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags()
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({
    status: 200,
    description: 'Users fetched successful based on the query',
  })
  @ApiOperation({ summary: 'this is to get all users and one user' })
  // @UseGuards(AccessTokenGuard)
  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number entries return per query',
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number of entries return',
    example: '1',
  })
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // console.log(typeof getUserParamDto);
    // console.log(typeof getUserParamDto.id);
    // console.log(getUserParamDto);
    // console.log(typeof limit);
    // console.log(limit);
    // console.log(typeof page);
    // console.log(page);
    if (getUserParamDto) {
      return this.userService.findOneById(getUserParamDto.id);
    }
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto,
    @Ip() ip: any,
    @Headers() header: any,
  ) {
    return this.userService.createUsers(createUserDto);
  }

  @Put()
  public putUsers() {
    return 'you sent a put request to the users';
  }

  @Patch()
  public editUser(@Body() editUserDto: EditUserDto) {
    console.log(editUserDto);
    return 'you sent a patch request to the users';
  }

  @Delete()
  public deleteUsers() {
    return 'you sent a delete request to the users';
  }
}
