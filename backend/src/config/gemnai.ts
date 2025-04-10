import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDFEVNR-M2h9dLXiHUtFVsThgqlt1EUIK8",
});

export const main = async (prompt: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "You are an expert in crafting detailed, vivid, and creative text-to-image prompts. Your goal is to transform basic or vague prompts into highly descriptive and imaginative prompts that are ideal for AI image generation tools. Use rich language, include visual details like lighting, setting, style, mood, and composition. Do not include explanations or formatting like JSON—respond with plain text only. If user prompt is not in detailed way you have right to make a general prompt for it.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "If user don't have a clear image of what he/she have to generate, user will give little idea and you have to generate a prompt according to required prompt.",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: { responseMimeType: "text/plain" },
  });
  console.log(response);

  return response; // Ensure it returns a string
};
