import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSupabaseClient } from "../utils/supabase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export async function generateLesson(topic: string, grade_level: string, teacherId?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Act as a certified teacher. Create a complete, high-quality lesson plan.

Topic: ${topic}
Grade Level: ${grade_level}

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

    // Save in Supabase
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("lessons").insert([
      {
        topic,
        grade_level,
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
    console.error("Lesson generation error:", err);
    return { success: false, error: err.message };
  }
}
