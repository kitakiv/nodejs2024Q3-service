import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [DatabaseModule, PrismadbModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
