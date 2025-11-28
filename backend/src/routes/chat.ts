import { Router } from "express";
import { runChat } from "../services/chatGemini";

const router = Router();

router.post("/", async (req, res) => {
  const { query } = req.body;
  const r = await runChat(query);
  res.json(r);
});

export default router;
