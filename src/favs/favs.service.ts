import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismadb/prismadb.service';
import { v4 as uuid } from 'uuid';
import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FavsService {
  constructor(private database: PrismaService) {}

  async getFavs() {
    const artists = await this.database.favsArtists.findMany();
    const albums = await this.database.favsAlbums.findMany();
    const tracks = await this.database.favsTracks.findMany();
    const artistsObj = await this.database.artist.findMany({
      where: {
        id: {
          in: artists.map((artist) => artist.artistId),
        },
      },
    });
    const albumsObj = await this.database.album.findMany({
      where: {
        id: {
          in: albums.map((album) => album.albumId),
        },
      },
    });
    const tracksObj = await this.database.track.findMany({
      where: {
        id: {
          in: tracks.map((track) => track.trackId),
        },
      },
    });

    return {
      artists: artistsObj,
      albums: albumsObj,
      tracks: tracksObj,
    };
  }

  async addAlbumToFavs(albumId: string) {
    const album = await this.database.album.findUnique({
      where: {
        id: albumId,
      },
    });
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    await this.database.favsAlbums.create({
      data: {
        id: uuid(),
        albumId,
      },
    });
    return album;
  }

  async addArtistToFavs(artistId: string) {
    const artist = await this.database.artist.findUnique({
      where: {
        id: artistId,
      },
    });
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    await this.database.favsArtists.create({
      data: {
        id: uuid(),
        artistId,
      },
    });
    return artist;
  }

  async addTrackToFavs(trackId: string) {
    const track = await this.database.track.findUnique({
      where: {
        id: trackId,
      },
    });
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.database.favsTracks.create({
      data: {
        id: uuid(),
        trackId,
      },
    });
    return track;
  }

  async deleteAlbumFromFavs(albumId: string) {
    const albumFavs = await this.database.favsAlbums.findUnique({
      where: {
        albumId,
      },
    });
    if (!albumFavs) {
      throw new NotFoundException('Album not found');
    }
    await this.database.favsAlbums.delete({
      where: {
        id: albumFavs.id,
      },
    });
    return {};
  }

  async deleteArtistFromFavs(artistId: string) {
    const artistFavs = await this.database.favsArtists.findUnique({
      where: {
        artistId,
      },
    });
    if (!artistFavs) {
      throw new NotFoundException('Artist not found');
    }
    await this.database.favsArtists.delete({
      where: {
        id: artistFavs.id,
      },
    });
    return {};
  }

  async deleteTrackFromFavs(trackId: string) {
    const trackFavs = await this.database.favsTracks.findUnique({
      where: {
        trackId,
      },
    });
    if (!trackFavs) {
      throw new NotFoundException('Track not found');
    }
    await this.database.favsTracks.delete({
      where: {
        id: trackFavs.id,
      },
    });
    return {};
  }
}
