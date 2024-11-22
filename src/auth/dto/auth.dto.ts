import { IsString } from 'class-validator';

class LoginDtoUser {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

class RefreshDtoToken {
  @IsString()
  refreshToken: string;
}

export { LoginDtoUser, RefreshDtoToken };
