export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

export interface Playlist {
  id: number;
  name: string;
  tracks: number[];
}
