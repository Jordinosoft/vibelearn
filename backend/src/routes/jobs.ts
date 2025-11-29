import { Router } from "express";
import { getSupabaseClient } from "../utils/supabase";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await getSupabaseClient()
    .from("ocr_jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
});

export default router;
