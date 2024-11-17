import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/artist.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private database: PrismaService) {}

  async findAll() {
    return await this.database.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return await this.database.artist.create({
      data: {
        id: uuid(),
        ...createArtistDto,
      },
    });
  }

  async updateArtist(artist: CreateArtistDto, artistId: string) {
    try {
      return await this.database.artist.update({
        where: {
          id: artistId,
        },
        data: {
          ...artist,
        },
      });
    } catch (error) {
      throw new NotFoundException('Artist not found');
    }
  }

  async removeArtist(id: string) {
    const artist = await this.database.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    await this.database.artist.delete({
      where: {
        id,
      },
    });
    return {};
  }
}
