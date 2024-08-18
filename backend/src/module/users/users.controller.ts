import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';

import { Serialize } from '../../common/decorators/serialize.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { Public } from '../auth/public.auth';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @Serialize(UserResponseDto)
  findAll(@Query('email') email: string, @Query('password') password: string) {
    if(email && password) return this.usersService.findUser(email, password)
    return this.usersService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
