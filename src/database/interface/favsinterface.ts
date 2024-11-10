import { Album } from './albuminterface';
import { Artist } from './artistinterface';
import { Track } from './trackinterface';

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export { FavoritesResponse };
