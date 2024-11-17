import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [DatabaseModule, PrismadbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
