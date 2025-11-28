import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chatRouter from "./routes/chat";
import ocrRouter from "./routes/ocr";
dotenv.config();   // <== MUST BE AT THE VERY TOP


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("VibeLearn Backend Running ✔"));

app.use("/chat", chatRouter);
app.use("/ocr", ocrRouter);

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
