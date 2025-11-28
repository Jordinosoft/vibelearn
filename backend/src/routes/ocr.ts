import { Router } from "express";
import multer from "multer";
import { processImageOCR } from "../services/ocrGoogle";
import { getSupabaseClient } from "../utils/supabase";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file" });

    const filename = `ocr/${Date.now()}.jpg`;

    const { data, error } = await getSupabaseClient().storage
      .from("uploads")
      .upload(filename, file.buffer, {
        contentType: "image/jpeg",
        upsert: true
      });

    if (error) return res.status(500).json({ error });

    const publicUrl = getSupabaseClient().storage
      .from("uploads")
      .getPublicUrl(filename).data.publicUrl;

    const result = await processImageOCR(publicUrl);

    return res.json({
      text: result.text,
      imageUrl: publicUrl
    });

  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
