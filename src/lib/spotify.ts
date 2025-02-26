import { ENDPOINTS } from "@/constants/constants";
import {
  CurrentlyPlayingTrack,
  RecentlyPlayedTrack,
  TopArtist,
  TopTrack,
} from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

const { access_token: token, expires_at } = JSON.parse(
  localStorage.getItem("spotify_auth_data")!
);

const verifyAuthState = () => {
  const date_ms = new Date().getTime();

  if (date_ms >= expires_at) return false;

  return true;
};

export const useGetCurrentlyPlaying = () => {
  const url = ENDPOINTS.get_currently_playing;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getCurrentlyPlaying"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) return null;

      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data: CurrentlyPlayingTrack | null;

      if (r.status === 204) {
        return null;
      }

      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }

      const res = await r.json();

      if (res.currently_playing_type === "track") {
        data = {
          title: res.item.name,
          artists: res.item.artists.map((a: { name: string }) => a.name),
          is_local: res.item.is_local,
          duration: res.item.duration_ms,
          progress: res.progress_ms,
          media_cover: {
            h: res.item.album.images[0].height,
            w: res.item.album.images[0].width,
            src: res.item.album.images[0].url,
          },
        };
      } else data = null;

      return data;
    },
  });

  return { error, data, isLoading };
};

export const useGetRecentlyPlayed = () => {
  const url = ENDPOINTS.get_recently_played;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getRecentlyPlayed"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) return null;

      const r = await fetch(url + "?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (r.status === 204) {
        return [];
      }

      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }

      const res = await r.json();

      return res.items as RecentlyPlayedTrack[];
    },
  });

  return { error, data, isLoading };
};

export const useGetTopItems = (
  type: "artists" | "tracks",
  duration: string
) => {
  const url = ENDPOINTS.get_top_items(type);
  const mapping = {
    "4 weeks": "short_term",
    "6 months": "medium_term",
    "1 year": "long_term",
  };
  const params = `?limit=50&time_range=${
    mapping[duration as keyof typeof mapping]
  }`;

  const { error, data, refetch, isFetching } = useQuery({
    queryKey: ["getTopItems"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) return null;

      const r = await fetch(url + params, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (r.status === 204) {
        return [];
      }

      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }

      const res = await r.json();

      let data: (TopTrack | TopArtist)[];

      if (type === "tracks") {
        data = res.items.map((r: any, i: number) => {
          return {
            artists: r.artists.map((a: any) => a.name),
            image_src: r.album.images[0].url,
            title: r.name,
            pos: i + 1,
            album: r.album.name,
          } as TopTrack;
        });
      } else if (type === "artists") {
        data = res.items.map((r: any, i: number) => {
          return {
            artist: r.name,
            image_src: r.images[0].url,
            pos: i + 1,
            genres: r.genres.slice(0, 3),
            followers: r.followers.total,
          } as TopArtist;
        });
      } else data = [];

      return data;
    },
    refetchInterval: false,
  });

  return { error, data, refetch, isFetching };
};
