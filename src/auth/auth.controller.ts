import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoUser, RefreshDtoToken } from './dto/auth.dto';
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

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshDtoToken: { refreshToken: unknown }) {
    if (!refreshDtoToken || typeof refreshDtoToken.refreshToken !== 'string') {
      throw new UnauthorizedException('Invalid token format');
    }
    return this.authService.refreshToken(refreshDtoToken.refreshToken);
  }
}
