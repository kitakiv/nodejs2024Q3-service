import { Album } from '../interface/albuminterface';
import { Artist } from '../interface/artistinterface';
import { FavoritesResponse } from '../interface/favsinterface';
import { Track } from '../interface/trackinterface';
import { NotFoundException } from '@nestjs/common';

class FavsDB {
  private favs: FavoritesResponse;
  constructor() {
    this.favs = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  deleteTrack(trackId: string) {
    this.favs.tracks = this.favs.tracks.filter((track) => track.id !== trackId);
  }

  deleteAlbum(albumId: string) {
    this.favs.albums = this.favs.albums.filter((album) => album.id !== albumId);
    this.favs.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  deleteArtist(artistId: string) {
    this.favs.artists = this.favs.artists.filter(
      (artist) => artist.id !== artistId,
    );
    this.favs.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    this.favs.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  getFavs() {
    return this.favs;
  }

  postTrackToFavs(track: Track) {
    this.favs.tracks.push(track);
    return this.favs.tracks;
  }

  deleteTrackFromFavs(trackId: string) {
    const trackToDelete = this.favs.tracks.find(
      (track) => track.id === trackId,
    );
    if (!trackToDelete) {
      throw new NotFoundException('Track not found');
    }
    this.favs.tracks = this.favs.tracks.filter((track) => track.id !== trackId);
    return this.favs.tracks;
  }

  deleteAlbumFromFavs(albumId: string) {
    const albumToDelete = this.favs.albums.find(
      (album) => album.id === albumId,
    );
    if (!albumToDelete) {
      throw new NotFoundException('Album not found');
    }
    this.favs.albums = this.favs.albums.filter((album) => album.id !== albumId);
    return this.favs.albums;
  }

  deleteArtistFromFavs(artistId: string) {
    const artistToDelete = this.favs.artists.find(
      (artist) => artist.id === artistId,
    );
    if (!artistToDelete) {
      throw new NotFoundException('Artist not found');
    }
    this.favs.artists = this.favs.artists.filter(
      (artist) => artist.id !== artistId,
    );
    return this.favs.artists;
  }

  postAlbumToFavs(album: Album) {
    this.favs.albums.push(album);
    return this.favs.albums;
  }

  postArtistToFavs(artist: Artist) {
    this.favs.artists.push(artist);
    return this.favs.artists;
  }
}

export default FavsDB;
