import fetch from "node-fetch"; // Required for fetch in Node.js

const API_URL = "https://api.cloudflare.com/client/v4/accounts/750250527aa24e3c4d35a9a1a523ae86/ai/run";

export const run = async (model: string, prompt: string) => {
  try {
    const response = await fetch(`${API_URL}/${model}`, {
      headers: {
        Authorization: "Bearer TD3Qi9bT5bue5E3kOrs7qIbXeHC-5yAQsgLNYw_f", 
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling AI API:", error);
    return { error: "Failed to fetch AI response" };
  }
};
