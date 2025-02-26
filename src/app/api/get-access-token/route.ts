import { REDIRECT_URI } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: new URLSearchParams({
        code: code as string,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const { access_token, expires_in } = await res.json();

    const date_ms = new Date().getTime();
    const spotifyAuthData = {
      access_token,
      expires_at: date_ms + expires_in * 1000,
    };

    return NextResponse.json({ data: spotifyAuthData }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "A server error occured." },
      { status: 500 }
    );
  }
};
