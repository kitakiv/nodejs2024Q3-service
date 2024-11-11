import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

class UpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
export { CreateUserDto, UpdatePasswordDto };
