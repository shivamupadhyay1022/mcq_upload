import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Exam from "./pages/Exam";
import Year from "./pages/Year";
import Mains from "./pages/Mains";
import Advance from "./pages/Advance";
import Neet from "./pages/Neet";
import Questions from "./pages/Questions";
import Latex from "./components/Latex";

function App() {
  const [count, setCount] = useState(0);
  const config = {
    "fast-preview": {
      disabled: true
    },
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    messageStyle: "none"
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Exam />} />
        <Route exact path="/year" element={<Year />} />
        <Route exact path="/mains" element={<Mains />} />
        <Route exact path="/advance" element={<Advance />} />
        <Route exact path="/neet" element={<Neet/>} />
        <Route exact path="/questions" element={<Questions/>}/>
      </Routes>
    </>
  );
}

export default App;
