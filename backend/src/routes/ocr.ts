// import { Router } from "express";
// import multer from "multer";
// import { processImageOCR } from "../services/ocrGoogle";
// import { getSupabaseClient } from "../utils/supabase";

// const upload = multer({ storage: multer.memoryStorage() });

// const router = Router();

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: "No file" });

//     const filename = `ocr/${Date.now()}.jpg`;

//     const { data, error } = await getSupabaseClient().storage
//       .from("uploads")
//       .upload(filename, file.buffer, {
//         contentType: "image/jpeg",
//         upsert: true
//       });

//     if (error) return res.status(500).json({ error });

//     const publicUrl = getSupabaseClient().storage
//       .from("uploads")
//       .getPublicUrl(filename).data.publicUrl;

//     const result = await processImageOCR(publicUrl);

//     return res.json({
//       text: result.text,
//       imageUrl: publicUrl
//     });

//   } catch (e: any) {
//     res.status(500).json({ error: e.message });
//   }
// });

// export default router;

import { Router } from "express";
import multer from "multer";
import { processImageOCR } from "../services/ocrGoogle";
import { getSupabaseClient } from "../utils/supabase";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/", upload.single("image"), async (req, res) => {
  console.log("\n----- 📥 Incoming OCR Request -----");

  try {
    console.log("📝 Request headers:", req.headers);

    const file = req.file;

    if (!file) {
      console.log("❌ No file received");
      return res.status(400).json({ error: "No file" });
    }

    console.log("📸 File received:");
    console.log("   - Original name:", file.originalname);
    console.log("   - MIME type:", file.mimetype);
    console.log("   - Size:", file.size, "bytes");

    const filename = `ocr/${Date.now()}.jpg`;
    console.log("📂 Preparing upload:", filename);

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filename, file.buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.log("❌ Supabase upload error:", error);
      return res.status(500).json({ error });
    }

    console.log("✅ Upload successful:", data);

    const publicUrl = supabase.storage
      .from("uploads")
      .getPublicUrl(filename).data.publicUrl;

    console.log("🌍 Public image URL:", publicUrl);
    console.log("🔍 Running OCR using Google Gemini…");

    const result = await processImageOCR(publicUrl);

    if (result.error) {
      console.log("❌ OCR processing error:", result.error);
    } else {
      console.log("📝 OCR result text length:", result.text?.length || 0);
    }

    console.log("----- ✅ OCR Request Complete -----\n");

    return res.json({
      text: result.text,
      imageUrl: publicUrl,
    });

  } catch (e: any) {
    console.log("🔥 Server error:", e.message);
    return res.status(500).json({ error: e.message });
  }
});

export default router;
