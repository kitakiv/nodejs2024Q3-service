import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    PrismadbModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AlbumModule {}
