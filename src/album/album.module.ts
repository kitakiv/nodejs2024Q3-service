import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismadbModule } from 'src/prismadb/prismadb.module';

@Module({
  imports: [DatabaseModule, PrismadbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
