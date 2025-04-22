import React, { useState } from "react";
import { parseTextWithImages } from "./parseTextWithImages";

function SolveexamWithMathlive({ currentquestion }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (opt) => {
    setSelectedOption(opt);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4">
        {/* Question */}
        <div>
          {parseTextWithImages(currentquestion?.question  || "")}
        </div>

        {/* Options */}
        {[1, 2, 3, 4].map((num) => {
          const optKey = `option${num}`;
          return (
            <div key={num} className="border-2  rounded-2xl border-slate-600">
              <label
                onClick={() => handleOptionChange(`op${num}`)}
                className=" flex justify-between cursor-pointer px-4 py-3 items-center"
              >
                <span
                  
                >{parseTextWithImages(currentquestion?.[optKey] || "")}</span>
                <input
                  type="radio"
                  name="options"
                  value={`op${num}`}
                  checked={selectedOption === `op${num}`}
                  onChange={() => {}}
                  className="radio checked:bg-blue-500 ml-4"
                />
              </label>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default SolveexamWithMathlive;
