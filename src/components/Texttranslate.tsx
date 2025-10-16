import axios from "axios";
import { useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";

interface Languages {
  code: string;
  name: string;
}

const Texttranslate = () => {
  const [inputText, setInputText] = useState("");
  const [languageList, setLanguageList] = useState<Languages[]>([]);
  const [resultText, setResultText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("https://libretranslate.com/languages");
        setLanguageList(res.data);
      } catch (err) {
        console.error("Language fetch error:", err);
      }
    };
    fetchLanguages();
  }, []);

  const detectLanguage = async (text: string) => {
    if (!text.trim()) return "en";
    try {
      const res = await axios.post(
        "https://libretranslate.com/detect",
        { q: text },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data[0]?.language || "en";
    } catch (err) {
      console.error("Language detection error:", err);
      return "en";
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setResultText("Please enter text to translate.");
      return;
    }
    setLoading(true);

    try {
      const source =
        sourceLanguage === "auto"
          ? await detectLanguage(inputText)
          : sourceLanguage;

      const res = await axios.post(
        "https://libretranslate.com/translate",
        {
          q: inputText,
          source,
          target: targetLanguage,
          format: "text",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.translatedText) {
        setResultText(res.data.translatedText);
      } else {
        setResultText("No translation returned.");
      }
    } catch (err) {
      console.error("Translation error:", err);
      setResultText("Translation failed. Try again.");
    }

    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    if (resultText) setResultText("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
        <textarea
          className="w-full border rounded-lg p-3 h-32"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex justify-center items-center mt-4 space-x-4">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            
            {languageList.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <GoArrowSwitch className="cursor-pointer" onClick={handleSwap} />
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
           
            {languageList.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full border rounded-lg p-3 h-32 mt-4"
          placeholder="Translated text here..."
          value={resultText}
          readOnly
        />
        <button
          className="bg-orange-500 text-white p-3 rounded-lg w-full mt-4"
          onClick={handleTranslate}
          disabled={!inputText || !targetLanguage || loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>
    </div>
  );
};

export default Texttranslate;
