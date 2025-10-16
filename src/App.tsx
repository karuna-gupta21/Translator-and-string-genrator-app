import Texttranslate from "./components/Texttranslate.tsx";
import Randomstringenrator from "./components/Randomstringenrator.tsx";
import Home from "./components/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/texttranslate" element={<Texttranslate />} />
          <Route path="/randomstringenrator" element={<Randomstringenrator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
