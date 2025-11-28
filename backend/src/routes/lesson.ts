import { Router } from "express";
import { generateLesson } from "../services/lessonGenerator";

const router = Router();

router.post("/", async (req, res) => {
  const { topic, grade_level, teacherId } = req.body;

  if (!topic || !grade_level) {
    return res.status(400).json({
      success: false,
      error: "Missing topic or grade",
    });
  }

  const response = await generateLesson(topic, grade_level, teacherId);
  res.json(response);
});

export default router;
