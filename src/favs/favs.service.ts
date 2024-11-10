import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  async getFavs() {
    return this.database.getFavs();
  }

  async addAlbumToFavs(albumId: string) {
    return this.database.postAlbumToFavs(albumId);
  }

  async addArtistToFavs(artistId: string) {
    return this.database.postArtistToFavs(artistId);
  }

  async addTrackToFavs(trackId: string) {
    return this.database.postTrackToFavs(trackId);
  }

  async deleteAlbumFromFavs(albumId: string) {
    return this.database.deleteAlbumFromFavs(albumId);
  }

  async deleteArtistFromFavs(artistId: string) {
    return this.database.deleteArtistFromFavs(artistId);
  }

  async deleteTrackFromFavs(trackId: string) {
    return this.database.deleteTrackFromFavs(trackId);
  }
}
