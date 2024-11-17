import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/album.dto';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private database: PrismaService) {}

  async findAll() {
    return this.database.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.database.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.database.album.create({
      data: {
        ...createAlbumDto,
        id: uuid(),
      },
    });
  }

  async updateAlbum(album: CreateAlbumDto, albumId: string) {
    try {
      return await this.database.album.update({
        where: {
          id: albumId,
        },
        data: {
          ...album,
        },
      });
    } catch (error) {
      throw new NotFoundException('Album not found');
    }
  }

  async deleteAlbum(albumId: string) {
    try {
      await this.database.album.delete({
        where: {
          id: albumId,
        },
      });
      return {};
    } catch (error) {
      throw new NotFoundException('Album not found');
    }
  }
}
