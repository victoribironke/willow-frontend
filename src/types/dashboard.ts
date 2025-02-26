export type RecentlyPlayedTrack = {
  track: {
    name: string;
    artists: { name: string }[];
    is_local: boolean;
    album: { name: string; images: { url: string; w: number; h: number }[] };
  };
  played_at: string;
  n: number;
};

export type TopTrack = {
  pos: number;
  image_src: string;
  title: string;
  artists: string[];
  album: string;
};

export type TopArtist = {
  pos: number;
  image_src: string;
  artist: string;
  followers: number;
  genres: string[];
};

export type CurrentlyPlayingTrack = {
  title: string;
  artists: string[];
  is_local: boolean;
  duration: number;
  progress: number;
  // device: { name: string; type: "computer" | "smartphone" | "speaker" };
  media_cover: { src: string; w: number; h: number };
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  followers: number;
  profile_pic: string;
  user_id: string;
  credits: number;
};
