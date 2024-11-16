import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async findAll() {
    const users = await this.database.user.findMany();
    return users.map((user) => this.deletePassword(user));
  }

  async findOne(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });
    return this.deletePassword(user);
  }

  async create(user: CreateUserDto) {
    const result = await this.database.user.create({
      data: {
        id: uuid(),
        login: user.login,
        password: user.password,
        version: 1,
      },
    });
    return this.deletePassword(result);
  }

  deletePassword(user: User) {
    const createdUser = {
      id: user.id,
      login: user.login,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
      version: user.version,
    };
    return createdUser;
  }

  async update(passwordFields: UpdatePasswordDto, userId: string) {
    const user = await this.database.user.update({
      where: {
        id: userId,
        password: passwordFields.oldPassword,
      },
      data: {
        password: passwordFields.newPassword,
        version: {
          increment: 1,
        },
        updatedAt: new Date(Date.now()).toISOString(),
      },
    });
    return this.deletePassword(user);
  }

  async delete(id: string) {
    const user = await this.database.user.delete({
      where: {
        id,
      },
    });
    return {};
  }
}
