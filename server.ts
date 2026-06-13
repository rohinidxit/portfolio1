/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with proper User-Agent header and environment secret key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Content Idea chatbot API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, genre, format, atmosphere, customPrompt } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not defined on the server side. Please check Settings > Secrets."
      });
    }

    // Build systemic constraints based on chosen options
    const systemInstruction = `You are "Agorathm", an elite AI Content Creator Mastermind & Creative Producer. 
Your goal is to generate exceptionally viral, memorable, and high-fidelity content ideas, scripts, and production blueprints for creators.

When brainstorming ideas, always include:
1. A catchy, scroll-stopping HOOK.
2. The core visual CONCEPT & SCENE-BY-SCENE outline (camera directions, sound suggestions, lighting).
3. The spoken SCRIPT/Voiceover text.
4. Social Media CAPTION formula and keyword tags.

Keep your tone inspiring, authentic, and highly professional. Always use clear, elegant Markdown layout formatting.

Context constraints:
- Visual Vibe / Tone: Keep the content aligned to the "${atmosphere || 'Cozy Warm Lofi'}" aesthetic.
- Selected Genre: Focus entirely on the "${genre || 'Comedy'}" genre.
- Shooting Platform / Format: Structured specifically for "${format || 'Instagram Reel (9:16)'}".

Be conversational and reply to direct follow-up questions from the user, giving deeper scripts, audio track suggestions, or title alternates.`;

    // Process messages array to match the Gemini SDK structure
    // We map custom roles to what Gemini expects
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || m.text }]
    }));

    // If a custom prompt was sent along as part of setting up, inject a trigger intro
    if (customPrompt && contents.length === 1 && contents[0].parts[0].text === '') {
      contents[0].parts[0].text = `Give me 3 viral content ideas about: "${customPrompt}" incorporating the "${genre}" genre and specialized shoot format "${format}".`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.85,
        topP: 0.95,
      }
    });

    const replyText = response.text || "I was unable to synthesize a creative blueprint. Please try clarifying your topic!";
    res.json({ content: replyText });

  } catch (error: any) {
    console.error("Gemini API server-side compilation error:", error);
    res.status(500).json({ error: error.message || "An exception occurred inside the neural synthesis module." });
  }
});

// Vite middleware and static asset serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully running on http://localhost:${PORT}`);
  });
}

bootstrap();
