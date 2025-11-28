import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../utils/supabase"; // Make sure this file exists and exports supabase

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const genAI = new GoogleGenerativeAI("AIzaSyC-RJsQCHlsMug-ez3F4hto0a7ikeBz3FI")
export async function generateLesson(topic: string, grade: string, teacherId?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Act as a certified teacher. Create a complete, high-quality lesson plan.

Topic: ${topic}
Grade Level: ${grade}

Format:
1. Title
2. Learning Objectives
3. Required Materials
4. Warm-up Activity
5. Teaching Steps
6. Examples
7. Student Activities
8. Assessment Questions
9. Summary
    `;

    const result = await model.generateContent(prompt);
    const lesson = result.response.text();

    // Save to Supabase
    const { data, error } = await supabase.from("lessons").insert([
      {
        topic,
        grade,
        content: lesson,
        teacher_id: teacherId || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
    }

    return {
      success: true,
      lesson,
      saved: !error,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
