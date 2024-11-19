import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [PrismadbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
