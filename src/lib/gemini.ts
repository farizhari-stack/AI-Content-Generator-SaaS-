
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Use a model that supports both text and images (multimodal)
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
