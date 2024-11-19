import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [PrismadbModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
