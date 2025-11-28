import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import chatRoutes from "./routes/chat";
import lessonRoutes from "./routes/lesson";
import ocrRoutes from "./routes/ocr";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/chat", chatRoutes);
app.use("/ocr", ocrRoutes);
app.use("/generate-lesson", lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Service Role exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log("Gemini key exists:", !!process.env.GEMINI_KEY);
