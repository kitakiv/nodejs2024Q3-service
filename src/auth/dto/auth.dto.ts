import { IsString } from 'class-validator';

class LoginDtoUser {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export { LoginDtoUser };
