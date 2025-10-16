import axios from "axios";
import { useState } from "react";
import { SlReload } from "react-icons/sl";

const Randomstringenrator = () => {
  const [quotes, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const getQuote = async () => {
    try {
      const { data } = await axios.get("/api/quotes/random");

      setQuote(data.quote);
      setAuthor(data.author.name);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Error fetching quote.");
      setAuthor("");
    }
  };

  return (
    <div className="flex justify-center border items-center min-h-screen h-full w-full bg-violet-200">
      {" "}
      <div className="text-center bg-white border rounded p-10">
        <h1 className="text-center underline p-7">Random String Genrator</h1>
        <div>
          <div>{quotes}</div>
          <div className="border"></div>
          <div>{author}</div>

          <button onClick={getQuote} className="border p-2 mt-3">
            <SlReload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Randomstringenrator;
