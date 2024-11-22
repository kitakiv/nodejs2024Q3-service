import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ValidationPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUniqueUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
    updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdatePasswordDto,
  ) {
    return this.userService.update(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
