import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoUser } from './dto/auth.dto';
import { AuthGuard } from 'src/auth.guard';
import { Public } from 'src/metadata/metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body(ValidationPipe) loginDtoUser: LoginDtoUser) {
    return this.authService.login(loginDtoUser);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body(ValidationPipe) loginDtoUser: LoginDtoUser) {
    return this.authService.signup(loginDtoUser);
  }
}
