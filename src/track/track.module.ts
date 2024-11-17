import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [DatabaseModule, PrismadbModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
