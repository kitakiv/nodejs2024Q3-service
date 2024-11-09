import { Global, Injectable } from '@nestjs/common';
import UserDB from './users/userdb';
import TrackDB from './tracks/trackdb';
import AlbumDB from './album/albumdb';
import ArtistDB from './artist/artistdb';
import { UserSecurity } from '../user/interface/interface';
import { CreateUserDto, UpdatePasswordDto } from '../user/dto/user.dto';
import { Track } from './interface/trackinterface';
import { CreateTrackDto } from 'src/track/dto/track.dto';
import { Album } from './interface/albuminterface';
import { Artist } from './interface/artistinterface';
import { CreateAlbumDto } from 'src/album/dto/album.dto';
import { CreateArtistDto } from 'src/artist/dto/artist.dto';

@Global()
@Injectable()
export class DatabaseService {
  private userDB: UserDB;

  private trackDB: TrackDB;

  private albumDB: AlbumDB;

  private artistDB: ArtistDB;
  constructor() {
    this.userDB = new UserDB();
    this.trackDB = new TrackDB();
    this.albumDB = new AlbumDB();
    this.artistDB = new ArtistDB();
  }

  async findAllUser(): Promise<UserSecurity[]> {
    return this.userDB.findAll();
  }

  async findAllTrack(): Promise<Track[]> {
    return this.trackDB.findAll();
  }

  async findAllAlbum(): Promise<Album[]> {
    return this.albumDB.findAll();
  }

  async findAllArtist(): Promise<Artist[]> {
    return this.artistDB.findAll();
  }

  async findOneUser(id: string): Promise<UserSecurity> {
    return this.userDB.getUser(id);
  }

  async findOneTrack(id: string): Promise<Track> {
    return this.trackDB.getTrack(id);
  }

  async findOneAlbum(id: string): Promise<Album> {
    return this.albumDB.findOne(id);
  }

  async findOneArtist(id: string): Promise<Artist> {
    return this.artistDB.getArtist(id);
  }

  async createUser(user: CreateUserDto): Promise<UserSecurity> {
    return this.userDB.createUser(user);
  }

  async updateUser(
    passwordFields: UpdatePasswordDto,
    userId: string,
  ): Promise<UserSecurity> {
    return this.userDB.updateUser(passwordFields, userId);
  }

  async deleteUser(id: string): Promise<object> {
    return this.userDB.deleteUser(id);
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    return this.trackDB.createTrack(track);
  }

  async updateTrack(track: CreateTrackDto, trackId: string): Promise<Track> {
    return this.trackDB.updateTrack(track, trackId);
  }

  async deleteTrack(trackId: string): Promise<object> {
    return this.trackDB.deleteTrack(trackId);
  }

  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    return this.albumDB.createAlbum(album);
  }

  async updateAlbum(album: CreateAlbumDto, albumId: string): Promise<Album> {
    return this.albumDB.updateAlbum(album, albumId);
  }

  async deleteAlbum(albumId: string): Promise<object> {
    return this.albumDB.deleteAlbum(albumId, this.trackDB.getTracks());
  }

  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    return this.artistDB.createArtist(artist);
  }

  async updateArtist(
    artist: CreateArtistDto,
    artistId: string,
  ): Promise<Artist> {
    return this.artistDB.updateArtist(artist, artistId);
  }

  async deleteArtist(artistId: string): Promise<object> {
    return this.artistDB.deleteArtist(
      artistId,
      this.trackDB.getTracks(),
      this.albumDB.getAlbums(),
    );
  }
}
