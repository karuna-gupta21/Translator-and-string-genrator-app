import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen   bg-violet-200 flex flex-col justify-center items-center gap-10">
      {" "}
      <h1 className="  font-bold  text-6xl  flex flex-col items-center justify-center">
        Build a <br />
        Translator and Random <br />
        string genrator App
      </h1>
      <div className=" flex flex-row space-x-10 justify-center items-center  text-xl underline ">
        {" "}
        <Link to="/texttranslate">Text Translate </Link>
        <Link to="/Randomstringenrator">Random string genrator </Link>
      </div>
    </div>
  );
};

export default Home;
