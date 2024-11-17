import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

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
    if (!user) {
      throw new NotFoundException('User not found');
    }
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

  deletePassword(user: {
    id: string;
    login: string;
    version: number;
    password: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
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
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== passwordFields.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }
    const updatedUser = await this.database.user.update({
      where: {
        id: userId,
        password: passwordFields.oldPassword,
      },
      data: {
        password: passwordFields.newPassword,
        version: user.version + 1,
        updatedAt: new Date(Date.now()).toISOString(),
      },
    });
    return this.deletePassword(updatedUser);
  }

  async delete(id: string) {
    try {
      await this.database.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
    return {};
  }
}
