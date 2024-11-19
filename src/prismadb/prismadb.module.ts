import { Module } from '@nestjs/common';
import { PrismaService } from './prismadb.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismadbModule {}
