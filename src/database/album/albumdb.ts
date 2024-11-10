import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { AlbumObject } from '../interface/albuminterface';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { TrackObject } from '../interface/trackinterface';

class AlbumDB {
  private album: AlbumObject;

  constructor() {
    this.album = {
      ids: [],
      entries: {},
    };
  }

  findAll() {
    return Object.values(this.album.entries);
  }

  findOne(id: string) {
    if (!this.album.entries[id]) {
      throw new NotFoundException('Album not found');
    }
    return this.album.entries[id];
  }

  createAlbum(album: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      ...album,
    };
    this.album.ids.push(newAlbum.id);
    this.album.entries[newAlbum.id] = newAlbum;
    return newAlbum;
  }

  updateAlbum(album: CreateAlbumDto, id: string) {
    const index = this.album.ids.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    const updatedAlbum = {
      ...this.album.entries[id],
      ...album,
    };
    this.album.entries[id] = updatedAlbum;
    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const index = this.album.ids.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    this.album.ids.splice(index, 1);
    delete this.album.entries[id];
    return this.album.entries[id];
  }

  deleteArtistFromAlbum(artistId: string) {
    this.album.ids.forEach((albumId) => {
      const album = this.album.entries[albumId];
      if (album) {
        if (album.artistId === artistId) {
          this.album.entries[albumId].artistId = null;
        }
      }
    });
  }

  getAlbums() {
    return this.album;
  }

  albumExists(id: string) {
    return this.album.entries[id] || false;
  }
}

export default AlbumDB;
