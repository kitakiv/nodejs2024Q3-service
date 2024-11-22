import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth.guard';
import { APP_GUARD } from '@nestjs/core';
config();

@Module({
  imports: [
    PrismadbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
