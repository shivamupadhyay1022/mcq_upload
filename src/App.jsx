import "./components/init"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Year from "./pages/Year";
import Mains from "./pages/Mains";
import Advance from "./pages/Advance";
import Neet from "./pages/Neet";
import Questions from "./pages/Questions";
import Latex from "./components/Latex";
import Home from "./pages/Home";
import Exams from "./pages/Exams";
import Viewexamquestions from "./pages/Viewexamquestions";
import Testpurpose from "./components/Testpurpose";

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/questions" element={<Questions/>}/>
        <Route exact path="/exams" element={<Exams/>}/>
        <Route  path="/viewexamquestions/:param" element={<Viewexamquestions/>}/>
        <Route  path="/test" element={<Testpurpose/>}/>

      </Routes>
    </>
  );
}

export default App;
