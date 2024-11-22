import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';

@Module({
  imports: [
    PrismadbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class FavsModule {}
