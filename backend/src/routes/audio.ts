import { Router } from "express";
import multer from "multer";
import { transcribeAudio } from "../services/audioGemini";
import { getSupabaseClient } from "../utils/supabase";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("audio"), async (req, res) => {
  console.log("----- 🎤 Incoming Audio Request -----");

  try {
    const file = req.file;

    if (!file) {
      console.log("❌ No audio file received");
      return res.status(400).json({ error: "No audio file sent" });
    }

    console.log("📄 File details:", {
      original: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    const filename = `audio/${Date.now()}-${file.originalname}`;

    // Upload to Supabase
    const supabase = getSupabaseClient();
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.log("❌ Supabase upload error", uploadError);
      return res.status(500).json({ error: uploadError });
    }

    const publicUrl = supabase.storage
      .from("uploads")
      .getPublicUrl(filename).data.publicUrl;

    console.log("📤 Uploaded audio URL:", publicUrl);

    // Send to Gemini for transcription
    const result = await transcribeAudio(publicUrl);

    return res.json({
      text: result.text,
      audioUrl: publicUrl,
      error: result.error
    });

  } catch (err: any) {
    console.log("🔥 Server audio error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
