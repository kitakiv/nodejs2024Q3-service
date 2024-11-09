import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  findAll() {
    return this.database.findAllTrack();
  }

  findOne(id: string) {
    return this.database.findOneTrack(id);
  }

  createTrack(track: CreateTrackDto) {
    return this.database.createTrack(track);
  }

  updateTrack(track: CreateTrackDto, trackId: string) {
    return this.database.updateTrack(track, trackId);
  }

  deleteTrack(trackId: string) {
    return this.database.deleteTrack(trackId);
  }
}
