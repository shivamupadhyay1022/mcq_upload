import { useState } from 'react'
import Navbar from './components/Navbar'
import Questions from './pages/Questions'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import { QuestionProvider } from './context/Context.jsx'
import { MathJaxProvider } from 'mathjax3-react'
import { MathJaxContext } from 'better-react-mathjax'

function App() {
  const [count, setCount] = useState(0)
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
    {/* <MathJaxProvider> */}
    <MathJaxContext config={config} >
    <QuestionProvider>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Questions/>} />
    </Routes>
    </QuestionProvider>
    </MathJaxContext>
    {/* </MathJaxProvider> */}
  </>
  )
}

export default App
