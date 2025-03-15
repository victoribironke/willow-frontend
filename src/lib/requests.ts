import { ENDPOINTS } from "@/constants/constants";
import { NewUser } from "@/types/auth";

export const registerUser = async (data: NewUser) => {
  try {
    const req = await fetch(ENDPOINTS.register_user, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  // const setUserDetails = useSetRecoilState(user_details);

  try {
    const req = await fetch(ENDPOINTS.verify_otp, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        otp,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    const authData = {
      access_token: res.data.accessToken,
      user_id: res.data.user.id,
    };

    localStorage.setItem("willow_auth_data", JSON.stringify(authData));

    // setUserDetails(res.data);

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const loginUser = async (email: string, password: string) => {
  // const setUserDetails = useSetRecoilState(user_details);

  try {
    const req = await fetch(ENDPOINTS.login_user, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    console.log(res);

    const authData = {
      access_token: res.data.accessToken,
      user_id: res.data.user.id,
    };

    localStorage.setItem("willow_auth_data", JSON.stringify(authData));

    // setUserDetails(res.data);

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const sendPasswordResetLink = async (email: string) => {
  try {
    const req = await fetch(ENDPOINTS.forgot_password, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const req = await fetch(ENDPOINTS.reset_password(token), {
      method: "PATCH",
      body: JSON.stringify({
        newPassword: password,
        confirmNewPassword: password,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const resendOtp = async (email: string) => {
  try {
    const req = await fetch(ENDPOINTS.resend_otp, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

// import { useQuery } from "@tanstack/react-query";

// const { access_token: token, expires_at } = JSON.parse(
//   localStorage.getItem("spotify_auth_data")!
// );

// const verifyAuthState = () => {
//   const date_ms = new Date().getTime();

//   if (date_ms >= expires_at) return false;

//   return true;
// };

// export const useGetTopItems = (
//   type: "artists" | "tracks",
//   duration: string
// ) => {
//   const url = ENDPOINTS.get_top_items(type);
//   const mapping = {
//     "4 weeks": "short_term",
//     "6 months": "medium_term",
//     "1 year": "long_term",
//   };
//   const params = `?limit=50&time_range=${
//     mapping[duration as keyof typeof mapping]
//   }`;

//   const { error, data, refetch, isFetching } = useQuery({
//     queryKey: ["getTopItems"],
//     queryFn: async () => {
//       const isVerified = verifyAuthState();

//       if (!isVerified) return null;

//       const r = await fetch(url + params, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (r.status === 204) {
//         return [];
//       }

//       if (!r.ok) {
//         throw new Error(`API error: ${r.status}`);
//       }

//       const res = await r.json();

//       let data: (TopTrack | TopArtist)[];

//       if (type === "tracks") {
//         data = res.items.map((r: any, i: number) => {
//           return {
//             artists: r.artists.map((a: any) => a.name),
//             image_src: r.album.images[0].url,
//             title: r.name,
//             pos: i + 1,
//             album: r.album.name,
//           } as TopTrack;
//         });
//       } else if (type === "artists") {
//         data = res.items.map((r: any, i: number) => {
//           return {
//             artist: r.name,
//             image_src: r.images[0].url,
//             pos: i + 1,
//             genres: r.genres.slice(0, 3),
//             followers: r.followers.total,
//           } as TopArtist;
//         });
//       } else data = [];

//       return data;
//     },
//     refetchInterval: false,
//   });

//   return { error, data, refetch, isFetching };
// };
