import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}

  findAll() {
    return this.database.findAllAlbum();
  }

  findOne(id: string) {
    return this.database.findOneAlbum(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.database.createAlbum(createAlbumDto);
  }

  updateAlbum(album: CreateAlbumDto, albumId: string) {
    return this.database.updateAlbum(album, albumId);
  }

  deleteAlbum(albumId: string) {
    return this.database.deleteAlbum(albumId);
  }
}
