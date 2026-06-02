import { NextRequest, NextResponse } from "next/server";
import { chatWithGemini, type ChatMessage } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message, persona, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Validate history shape if provided
    const chatHistory: ChatMessage[] = Array.isArray(history)
      ? history.filter(
          (m): m is ChatMessage =>
            m &&
            typeof m.content === "string" &&
            (m.role === "user" || m.role === "assistant")
        )
      : [];

    const reply = await chatWithGemini(message, persona, chatHistory);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    );
  }
}
