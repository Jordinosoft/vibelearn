import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
export async function processImageOCR(imageUrl: string) {
  try {
    const img = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(img.data).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      { text: "Extract all visible text from the image." },
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      }
    ]);

    return {
      text: result.response.text(),
      error: null
    };

  } catch (err: any) {
    return { text: "", error: err.message };
  }
}
