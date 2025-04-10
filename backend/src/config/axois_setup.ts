import axios from "axios";

interface FetchImageParameters {
  url: string;
  method: "GET" | "POST";
  data?: string;
}

export const fetchImage = async ({ url, method, data }: FetchImageParameters): Promise<string> => {
  try {
    const response = await axios({
      url,
      method,
      data,
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (err) {
    console.error("Error fetching image:", err);
    throw new Error("Failed to fetch image");
  }
};
