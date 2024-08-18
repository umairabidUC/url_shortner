import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUser } from './dto';
import { Token } from './types';
import { IsStrongPassword } from 'class-validator';
import { Public } from './public.auth';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() newUser: NewUser): Promise<Token> {
    return this.authService.signUp(newUser);
  }

  @Post('/signin')
  signIn(@Body('email') email: string, @Body('password') password:string): Promise<Token>{
    return this.authService.signIn(email, password)
  }
  
}
