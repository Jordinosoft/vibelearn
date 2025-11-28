import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export async function transcribeAudio(audioUrl: string) {
  try {
    console.log("🎧 Downloading audio for transcription...");

    // Fetch audio as buffer
    const audioResp = await axios.get(audioUrl, {
      responseType: "arraybuffer",
    });

    const base64Audio = Buffer.from(audioResp.data).toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent([
      { text: "Transcribe all speech from this audio file. Only return text." },
      {
        inlineData: {
          data: base64Audio,
          mimeType: "audio/m4a", // We'll adjust based on upload later
        }
      }
    ]);

    const text = result.response.text();

    console.log("📝 Transcription:", text);

    return { text, error: null };

  } catch (err: any) {
    console.log("❌ Audio transcribe error:", err.message);
    return { text: "", error: err.message };
  }
}
