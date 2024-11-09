import { CreateArtistDto } from 'src/artist/dto/artist.dto';
import { ArtistObject } from '../interface/artistinterface';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { TrackObject } from '../interface/trackinterface';
import { AlbumObject } from '../interface/albuminterface';

class ArtistDb {
  private artist: ArtistObject;
  constructor() {
    this.artist = {
      ids: [],
      entries: {},
    };
  }

  findAll() {
    return Object.values(this.artist.entries);
  }

  getArtist(id: string) {
    if (!this.artist.entries[id]) {
      throw new NotFoundException('Artist not found');
    }
    return this.artist.entries[id];
  }

  createArtist(artist: CreateArtistDto) {
    const { name, grammy } = artist;
    const id = uuid();
    const newArtist = {
      id,
      name,
      grammy,
    };
    this.artist.ids.push(newArtist.id);
    this.artist.entries[newArtist.id] = newArtist;
    return newArtist;
  }

  updateArtist(artist: CreateArtistDto, artistId: string) {
    const { name, grammy } = artist;
    if (!this.artist.entries[artistId]) {
      throw new NotFoundException('Artist not found');
    }
    this.artist.entries[artistId].name = name;
    this.artist.entries[artistId].grammy = grammy;
    return this.artist.entries[artistId];
  }

  deleteArtist(artistId: string, tracks: TrackObject, albums: AlbumObject) {
    const index = this.artist.ids.indexOf(artistId);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    tracks.ids.forEach((trackId) => {
      if (tracks.entries[trackId].artistId === artistId) {
        tracks.entries[trackId].artistId = null;
      }
    });
    albums.ids.forEach((albumId) => {
      if (albums.entries[albumId].artistId === artistId) {
        albums.entries[albumId].artistId = null;
      }
    });
    this.artist.ids.splice(index, 1);
    delete this.artist.entries[artistId];
    return {};
  }
}

export default ArtistDb;