import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { LoginDtoUser } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private database: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDtoUser: LoginDtoUser) {
    const { login, password } = loginDtoUser;
    const user = await this.database.user.findUnique({
      where: {
        login,
      },
    });
    if (!user || user.password !== password) {
      throw new ForbiddenException(
        "no user with such login, password doesn't match actual one",
      );
    }
    const payload = { id: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(user: LoginDtoUser) {
    try {
      const result = await this.database.user.create({
        data: {
          id: uuid(),
          login: user.login,
          password: user.password,
          version: 1,
        },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const createdUser = {
        id: result.id,
        login: result.login,
        version: result.version,
        createdAt: new Date(result.createdAt).getTime(),
        updatedAt: new Date(result.updatedAt).getTime(),
      };
      return createdUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with such login already exists');
        }
      }
      throw error;
    }
  }
}
