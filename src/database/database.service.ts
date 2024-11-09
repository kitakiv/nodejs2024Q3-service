import { Global, Injectable } from '@nestjs/common';
import UserDB from './users/userdb';
import TrackDB from './tracks/trackdb';
import { UserSecurity } from '../user/interface/interface';
import { CreateUserDto, UpdatePasswordDto } from '../user/dto/user.dto';
import { Track } from './interface/trackinterface';
import { CreateTrackDto } from 'src/track/interface/interface';

@Global()
@Injectable()
export class DatabaseService {
  private userDB: UserDB;

  private trackDB: TrackDB;
  constructor() {
    this.userDB = new UserDB();
    this.trackDB = new TrackDB();
  }

  async findAllUser(): Promise<UserSecurity[]> {
    return this.userDB.findAll();
  }

  async findAllTrack(): Promise<Track[]> {
    return this.trackDB.findAll();
  }

  async findOneUser(id: string): Promise<UserSecurity> {
    return this.userDB.getUser(id);
  }

  async findOneTrack(id: string): Promise<Track> {
    return this.trackDB.getTrack(id);
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

  async createTrack(track: Track): Promise<Track> {
    return this.trackDB.createTrack(track);
  }

  async updateTrack(track: CreateTrackDto, trackId: string): Promise<Track> {
    return this.trackDB.updateTrack(track, trackId);
  }

  async deleteTrack(trackId: string): Promise<Track> {
    return this.trackDB.deleteTrack(trackId);
  }
}
