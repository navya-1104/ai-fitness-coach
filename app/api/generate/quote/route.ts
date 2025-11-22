import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are a short, powerful motivational coach. Produce ONE short, energetic fitness motivational sentence (<= 20 words).`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 30,
      temperature: 0.85,
    });

    const quote = completion.choices?.[0]?.message?.content?.trim() ?? "Keep going — progress is progress.";
    return new Response(JSON.stringify({ quote }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ quote: "Keep going — progress is progress." }), { status: 500 });
  }
}
