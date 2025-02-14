import React,{useEffect, useState} from 'react'
import  'mathlive'
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

function Testpurpose() {
  const [mathInput, setMathInput] = useState("");
  useEffect(() => {console.log(mathInput)},[mathInput])

  return (
    <div>
      <math-field 
        onInput={(e) => setMathInput(e.target.value)}
        style={{width: '100%', height: '50px'}}
      ></math-field>
      <input onChange={(e)=>{setMathInput(e.target.value)}}/>
      <p>Rendered Formula:</p>
      <div className='flex flex-col' >
        <p>{mathInput}</p>
      <math-field read-only>{mathInput}</math-field>
      <InlineMath>{mathInput}</InlineMath>
      </div>

    </div>
  );
}

export default Testpurpose