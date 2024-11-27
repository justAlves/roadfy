import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = geminiClient.getGenerativeModel({
  model: "gemini-1.5-flash"
})



