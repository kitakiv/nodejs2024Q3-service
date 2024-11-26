import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
config();

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async findAll() {
    const users = await this.database.user.findMany();
    return users.map((user) => this.deletePassword(user));
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = +process.env.CRYPT_SALT;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = await this.database.user.create({
        data: {
          id: uuid(),
          login: createUserDto.login,
          password: hash,
          version: 1,
        },
      });
      return this.deletePassword(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
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
    const isMatch = await bcrypt.compare(
      passwordFields.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new ForbiddenException('oldPassword is wrong');
    }
    const saltOrRounds = +process.env.CRYPT_SALT;
    const hash = await bcrypt.hash(passwordFields.newPassword, saltOrRounds);
    const updatedUser = await this.database.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
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
