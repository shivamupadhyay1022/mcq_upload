import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import QuestionCard from "../components/QuestionCard";
import { ToastContainer } from "react-toastify";
function Viewexamquestions() {
    const [Questionlist, setQuestionlist] = useState([]);
  const [showdelaytext, setShowDelayedText] = useState(false);
  const { param } = useParams();
  const [seed,setSeed] = useState(0);

  useEffect(() => {
    setShowDelayedText(false);

    setTimeout(() => {
      setShowDelayedText(true);
    }, 2000);
    getQuestionlist();

    console.log("reload");
  }, []);
  async function getQuestionlist() {
    var id_array = await splitstring();
    var list = []
    for (var i = 0; i < id_array.length; i++) {
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("id", id_array[i]);
        if (error) throw error;
        if (data != null) {
          list.push(...data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setQuestionlist(list);
    console.log(Questionlist);
    // setSeed(Math.random())
  }

  async function splitstring() {
    var str_array = param.split(",");
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:
    }
    console.log(str_array);
    return str_array;
  }

  return (
    <div>
      <ToastContainer/>
      {" "}
      {!showdelaytext ? (
        <div className="absolute top-[40%] right-[40%] transform -translate-x-1/2 -translate-y-1/2 spinner md:top-1/2 md:left-1/2">
          <div className="loader">
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
            <div className="loader-square"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div>
            {Questionlist.map((item) => (
              <QuestionCard key={item.id} item={item} /> // Adjust based on your data structure
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewexamquestions;
