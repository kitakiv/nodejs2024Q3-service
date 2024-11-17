import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: PrismaService) {}

  async findAll() {
    return await this.database.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.database.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(track: CreateTrackDto) {
    const trackCreated = await this.database.track.create({
      data: {
        id: uuid(),
        ...track,
      },
    });
    return trackCreated;
  }

  async updateTrack(track: CreateTrackDto, trackId: string) {
    const trackFound = await this.database.track.findUnique({
      where: {
        id: trackId,
      },
    });
    if (!trackFound) {
      throw new NotFoundException('Track not found');
    }
    const trackUpdated = await this.database.track.update({
      where: {
        id: trackId,
      },
      data: {
        ...track,
      },
    });
    return trackUpdated;
  }

  async deleteTrack(trackId: string) {
    try {
      await this.database.track.delete({
        where: {
          id: trackId,
        },
      });
      return {};
    } catch (error) {
      throw new NotFoundException('Track not found');
    }
  }
}
