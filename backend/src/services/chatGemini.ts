import { GoogleGenerativeAI } from "@google/generative-ai";

//const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const genAI = new GoogleGenerativeAI("AIzaSyC-RJsQCHlsMug-ez3F4hto0a7ikeBz3FI")
export async function runChat(query: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const res = await model.generateContent(query);

    return {
      reply: res.response.text(),
      error: null
    };

  } catch (err: any) {
    return { reply: "", error: err.message };
  }
}
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

// export async function runChat(query: string) {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const res = await model.generateContent([{ text: query }]);

//     return {
//       reply: res.response.text(),
//       error: null,
//     };
//   } catch (err: any) {
//     return { reply: "", error: err.message };
//   }
// }
