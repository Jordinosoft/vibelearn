import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import OpenAI from 'https://esm.sh/openai@4';

const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_KEY") });
const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

Deno.serve(async (req) => {
  const { teacher_id, title, grade_level, topic } = await req.json();

  const prompt = `Create a structured lesson:
  Title: ${title}
  Grade level: ${grade_level}
  Topic: ${topic}

  Include:
  - Lesson content
  - 5 multiple-choice questions
  - Answers
  `;

  const result = await openai.chat.completions.create({
    model: "o1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const text = result.choices[0].message.content;

  await supabase.from("lessons").insert({
    teacher_id,
    title,
    topic,
    grade_level,
    content: text
  });

  return new Response(JSON.stringify({ content: text }));
});
