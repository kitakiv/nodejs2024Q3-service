import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { LoginDtoUser } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthService {
  constructor(
    private database: PrismaService,
    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string) {
    try {
      const { userId, login } = await this.jwtService.verifyAsync(refreshToken);
      const payload = { userId, login };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        }),
      };
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  async login(loginDtoUser: LoginDtoUser) {
    const { login, password } = loginDtoUser;
    const user = await this.database.user.findUnique({
      where: {
        login,
      },
    });
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!user || !isMatch) {
      throw new ForbiddenException(
        "no user with such login, password doesn't match actual one",
      );
    }
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      })
    };
  }

  async signup(user: LoginDtoUser) {
    try {
      const saltOrRounds = +process.env.CRYPT_SALT;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      const result = await this.database.user.create({
        data: {
          id: uuid(),
          login: user.login,
          password: hash,
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
