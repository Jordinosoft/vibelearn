import { Router } from "express";
import { generateLesson } from "../services/lessonGenerator";

const router = Router();

router.post("/", async (req, res) => {
  const { topic, grade, teacherId } = req.body;

  if (!topic || !grade) {
    return res.status(400).json({
      success: false,
      error: "Missing topic or grade",
    });
  }

  const response = await generateLesson(topic, grade, teacherId);
  res.json(response);
});

export default router;
