interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}
interface ArtistObject {
  ids: string[];
  entries: {
    [id: string]: Artist;
  };
}

export { Artist, ArtistObject };
