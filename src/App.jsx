import { useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

function App() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    if (!textInput || !selectValue) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://google-translator9.p.rapidapi.com/v2",
        {
          q: textInput,
          source: "en",
          target: selectValue,
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        }
      );

      const translated =
        response?.data?.data?.translations?.[0]?.translatedText || "";

      setResult(translated);
    } catch (error) {
      console.error(
        "Translation error:",
        error.response?.data || error.message
      );
      setResult("❌ Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-green-500 via-yellow-400 to-white flex items-center justify-center">
      <div className="flex flex-col gap-y-8 bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[650px]">
        <h1 className="text-5xl font-extrabold text-center">
          🌿 Text Translator
        </h1>

        <textarea
  placeholder="Enter text here..."
  className="h-32 w-full border rounded-2xl p-4 text-lg bg-white"
  onChange={(e) => setTextInput(e.target.value)}
/>

<textarea
  placeholder="Translation will appear here..."
  className="h-32 w-full border rounded-2xl p-4 text-lg bg-white"
  value={result}
  readOnly
/>
        <select
          className="p-3 rounded-xl border text-lg bg-white"
          onChange={(e) => setSelectValue(e.target.value)}
        >
     <option value="">Select</option> 
     <option value="hi">Hindi</option>
      <option value="bn">Bengali</option>
       <option value="te">Telugu</option> 
       <option value="ta">Tamil</option> 
       <option value="as">Assamese</option> 
       <option value="brx">Bodo</option>
        <option value="doi">Dogri</option> 
        <option value="gu">Gujarati</option> 
        <option value="kn">Kannad</option> 
        <option value="ks">Kashmiri</option>
         <option value="gom">Konkani</option> 
         <option value="mai">Maithili</option>
          <option value="ml">Malayalam</option> 
          <option value="mni">Manipuri</option> 
          <option value="mr">Marathi</option> 
          <option value="ne">Nepali</option>
           <option value="or">Odia</option> 
           <option value="pa">Punjabi</option> 
           <option value="sa">Sanskrit</option> 
           <option value="sat">Santali</option>
            <option value="sd">Sindhi</option> 
            <option value="ur">urdu</option>
        </select>

        <button
          onClick={handleTextTranslation}
          className="w-full py-3 rounded-2xl bg-green-500 text-white font-semibold text-lg hover:scale-105 transition"
        >
          {loading ? (
            <LoaderCircle className="animate-spin mx-auto" />
          ) : (
            "Translate"
          )}
        </button>
      </div>
    </div>
  );
}

export default App;





