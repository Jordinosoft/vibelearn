// deno run in supabase edge function
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import OpenAI from 'https://esm.sh/openai@4';

const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_KEY") });

Deno.serve(async (req) => {
  const { user_id, message } = await req.json();

  // save message
  await supabase.from("messages").insert({
    user_id,
    role: "user",
    text: message
  });

  // AI response
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }]
  });

  const reply = completion.choices[0].message.content;

  // save assistant message
  await supabase.from("messages").insert({
    user_id,
    role: "assistant",
    text: reply
  });

  return new Response(JSON.stringify({ reply }));
});
