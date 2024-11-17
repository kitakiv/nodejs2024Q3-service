import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [PrismadbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
