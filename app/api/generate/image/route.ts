import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // If no API key => always fallback to placeholder
    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({
        image: `https://via.placeholder.com/512?text=${encodeURIComponent(prompt)}`
      });
    }

    // Try Replicate image generation
    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "a9758cb2e2e3f6e6f3c7b5d3b1820f1e0f0d8a3b0b6c1d2e3f4a5b6c7d8e9f0",
        input: { prompt },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({
        image: `https://via.placeholder.com/512?text=${encodeURIComponent(prompt)}`,
      });
    }

    const data = await res.json();

    return NextResponse.json({
      image:
        data?.output?.[0] ||
        data?.urls?.get ||
        `https://via.placeholder.com/512?text=${encodeURIComponent(prompt)}`,
    });
  } catch (e: any) {
    return NextResponse.json({
      image: `https://via.placeholder.com/512?text=${encodeURIComponent(
        "error"
      )}`,
    });
  }
}
