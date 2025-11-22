import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = `
You are a professional certified personal trainer and nutritionist.
Create a personalized 7-day fitness plan and diet for the user below.
Return concise, actionable markdown with sections: SUMMARY, WORKOUT PLAN (day-wise), DIET PLAN, TIPS.

User details:
Name: ${body.name}
Age: ${body.age}
Gender: ${body.gender}
Height: ${body.height}
Weight: ${body.weight}
Goal: ${body.goal}
Fitness level: ${body.level}
Workout location: ${body.location}
Diet preference: ${body.dietPref}
Extras: ${body.extras || "None"}
    `;

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are an expert fitness coach and nutritionist." }, { role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1400,
    });

    const text = resp.choices?.[0]?.message?.content ?? "No response.";
    return NextResponse.json({ plan: text });
  } catch (err:any) {
    console.error(err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
