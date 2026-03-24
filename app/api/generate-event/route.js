import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EventSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "tech",
    "music",
    "sports",
    "art",
    "food",
    "business",
    "health",
    "education",
    "gaming",
    "networking",
    "outdoor",
    "community",
  ]),
  suggestedCapacity: z.number().int().min(10).max(500),
  suggestedTicketType: z.enum(["free", "paid"]),
});

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.parse({
      model: "gpt-4o-2024-08-06",
      input: [
        {
          role: "system",
          content:
            "You are an event planning assistant. Generate event details from the user's event idea. Keep descriptions clear, natural, and useful for an event creation form.",
        },
        {
          role: "user",
          content: `
Generate event details from this idea: ${prompt}

Rules:
- title: catchy, professional, under 80 chars
- description: single paragraph, 2-3 sentences
- category: must be one of the allowed enum values
- suggestedCapacity: integer between 10 and 500
- suggestedTicketType: free or paid
          `,
        },
      ],
      text: {
        format: zodTextFormat(EventSchema, "event"),
      },
    });

    const eventData = response.output_parsed;

    return NextResponse.json(eventData);
  } catch (error) {
    console.error("OpenAI error:", error);

    const status = error?.status || 500;
    const message =
      error?.message || "Failed to generate event with OpenAI";

    return NextResponse.json({ error: message }, { status });
  }
}