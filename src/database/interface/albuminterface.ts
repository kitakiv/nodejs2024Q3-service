interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface AlbumObject {
  ids: string[];
  entries: {
    [id: string]: Album;
  };
}

export { Album, AlbumObject };
