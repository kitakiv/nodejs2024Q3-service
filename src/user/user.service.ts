import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async findAll() {
    return await this.database.user.findMany();
  }

  async findOne(id: string) {
    return await this.database.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user: CreateUserDto) {
    return await this.database.user.create({
      data: {
        id: uuid(),
        login: user.login,
        password: user.password,
        version: 1,
      },
    });
  }

  async update(passwordFields: UpdatePasswordDto, userId: string) {
    return await this.database.user.update({
      where: {
        id: userId,
        password: passwordFields.oldPassword,
      },
      data: {
        password: passwordFields.newPassword,
        version: {
          increment: 1,
        },
      },
    });
  }

  async delete(id: string) {
    return await this.database.user.delete({
      where: {
        id,
      },
    });
  }
}
