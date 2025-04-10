import express, { Request, Response } from "express";
import { run } from "../image-gen/generation";
import { main } from "../config/gemnai";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body.prompt;
    if (!data) {
      res.status(400).json({ error: "Prompt is required" });
    }

    const response = await main(data);
    let response_text = (response.candidates[0].content.parts[0].text).replace(/(^")|("$)/g, "").trim();
    // let text = response_text.candidates[0]?.content?.parts?.[0]?.text;
    console.log(response_text);
    

    // Use responseText directly
    const result = await run("@cf/black-forest-labs/flux-1-schnell", response_text || data);

    res.json(result);
    console.log(result);
     // Send the result
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/gemani", async (req: Request, res: Response) => {
  try {
    let prompt = "Make a cat";
    let result = await main(prompt);  // Await the async function
    console.log(result);
    res.status(200).json((result.candidates[0].content.parts[0].text).replace(/(^")|("$)/g, "").trim());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
