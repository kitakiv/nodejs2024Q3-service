import { CreateTrackDto } from '../../track/dto/track.dto';
import { TrackObject } from '../interface/trackinterface';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';

class TrackDB {
  private track: TrackObject;
  constructor() {
    this.track = {
      ids: [],
      entries: {},
    };
  }

  findAll() {
    return Object.values(this.track.entries);
  }

  getTrack(id: string) {
    const track = this.track.entries[id];
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  createTrack(track: CreateTrackDto) {
    const id = uuid();
    this.track.ids.push(id);
    const trackCreated = {
      id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
    this.track.ids.push(id);
    this.track.entries[id] = trackCreated;
    return trackCreated;
  }

  updateTrack(track: CreateTrackDto, trackId: string) {
    const trackExists = this.track.entries[trackId];
    if (!trackExists) {
      throw new NotFoundException('Track not found');
    }

    trackExists.name = track.name;
    trackExists.artistId = track.artistId || null;
    trackExists.albumId = track.albumId || null;
    trackExists.duration = track.duration;
    return trackExists;
  }

  deleteTrack(trackId: string) {
    const trackIndex = this.track.ids.indexOf(trackId);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }
    this.track.ids.splice(trackIndex, 1);
    delete this.track.entries[trackId];
    return this.track.entries[trackId];
  }
}

export default TrackDB;
