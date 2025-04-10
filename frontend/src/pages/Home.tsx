import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import axiosInstance from "@/lib/axios_setup";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/", { prompt });
      const base64Image = response?.data?.result?.image;

      if (base64Image) {
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setImages((prev) => [imageUrl, ...prev]);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-center">
      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Unlock Your Creative Potential with AI
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Get instant art inspiration, color palettes, and creative ideas
          powered by artificial intelligence.
        </p>
      </header>

      {/* Prompt Input */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter your inspiration (e.g., cyberpunk city, medieval fantasy)"
              className="w-full pl-10 pr-4 py-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none border-2 border-b-0 sm:border-b-2 sm:border-r-0 border-gray-200 focus:outline-none focus:border-indigo-500"
              value={prompt}
              onChange={handleChange}
              required
              onInvalid={(e) => e.currentTarget.setCustomValidity("Please enter your inspiration.")}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-indigo-700 flex items-center justify-center disabled:opacity-70"
            disabled={loading}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex flex-col h-fit items-center justify-center gap-4 mb-10">
          <div className="w-full sm:w-5/6 md:w-[50%] lg:w-[70%] animate-pulse">
            <div className="w-full h-80 bg-gray-200 rounded-lg shadow-inner" />
          </div>
          <p className="text-gray-500">Generating your artwork...</p>
        </div>
      )}

      {/* Image Gallery */}
      <div className="flex flex-col items-center flex-wrap justify-center gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="w-full sm:w-5/6 md:w-[50%] lg:w-[70%]">
            <img
              src={img}
              alt={`Generated AI ${idx}`}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
