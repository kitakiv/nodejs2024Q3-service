interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface TrackObject {
  ids: string[];
  entries: {
    [id: string]: Track;
  };
}

export { Track, TrackObject };
