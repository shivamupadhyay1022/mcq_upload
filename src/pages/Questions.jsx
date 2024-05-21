import React from "react";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Custcard from "../components/Custcard";
let myArray = [];

function Questions() {
  const [quest, setQuest] = useState([]);
  const [year, chngyear] = useState();
  const [sub, chngSub] = useState();
  const [isOpen, setisOpen] = useState(false);
  const [question, setQuestion] = useState();
  const [tag, setTag] = useState();
  const [op1, setOp1] = useState();
  const [op2, setOp2] = useState();
  const [op3, setOp3] = useState();
  const [op4, setOp4] = useState();
  const [correct, setCorrect] = useState();
  const [subject, setSubject] = useState();
  const [alert, setAlert] = useState();
  const [explanation, setExplanation] = useState();
  const [type, setType] = useState();

  let [selectNEET, setSelectNEET] = useState(true);
  let [selectJEE_Mains, setSelectJEE_Mains] = useState(true);
  let [selectChem, setSelectChem] = useState(true);

  const addSubject = (subject) => {
    myArray.push(subject);
    console.log(myArray);
  };

  async function onUpload(){
    try{
        const {data, error} = await supabase
        .from("questions")
        .insert({
            exam:myArray,
            subject:subject,
            question:question,
            type:type,
            option1:op1,
            option2:op2,
            option3:op3,
            option4:op4,
            correct:correct,
            explanation:explanation,
            tags:tag
            
        })
        .single()
        if (error) throw error;
        window.location.reload()

    }catch(error){
        console.log(error)
    }
  }

  const removeSubject = (subject) => {
    myArray = myArray.filter((myArray) => myArray !== subject);
    console.log(myArray);
  };

  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const { data, error } = await supabase.from("questions").select("*").limit(10)
      if (error) throw error;
      if (data != null) {setQuest(data);}
    } catch (error) {}
  }

  return (
    <div className="mx-8">
      <h1 className="w-full text-center text-xl sm:text-lg">Jee Mains</h1>
      {/* alert */}
      <div
        role="alert"
        className={"alert alert-errorn " + (alert ? "show" : "hidden")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>All fields must be filled!!.</span>
        <button
          className="btn btn-sm"
          onClick={(e) => {
            setAlert();
          }}
        >
          Close
        </button>
      </div>
      <div className="flex flex-row justify-between">
        {/* Select year */}
        <details
          role="button"
          open={isOpen}
          className="dropdown dropdown-start  mr-8"
        >
          <summary className="m-1 ">{year || "Year"}</summary>
          <ul className="p-2 shadow menu dropdown-content gap-1 z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngyear("2020");
                  setisOpen(false);
                }}
              >
                2020
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngyear("2021");
                  setisOpen(false);
                }}
              >
                2021
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngyear("2022");
                  setisOpen(false);
                }}
              >
                2022
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngyear("2023");
                  setisOpen(false);
                }}
              >
                2023
              </a>
            </li>
          </ul>
        </details>
        {/* Select Subject */}
        <details role="button" className="dropdown dropdown-start  mr-8">
          <summary className="m-1 ">{sub || "Subject"}</summary>
          <ul className="p-2 shadow menu dropdown-content gap-1 z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngSub("Phy");
                }}
              >
                Phy
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngSub("Chem");
                }}
              >
                chem
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  chngSub("maths");
                }}
              >
                maths
              </a>
            </li>
          </ul>
        </details>
        {/* Add qsn button */}
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add new Question
        </button>
      </div>
      {/* add question dialog */}
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box flex flex-col max-w-[48rem] ">
          <div className="flex justify-between  ">
            <h3 className={"font-bold my-2 text-lg "}>Add new question here</h3>
            <div className="modal-action -mt-1 ">
              <form method="dialog">
                <button className="btn btn-square btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* <form> */}
          <div className=" flex flex-col gap-3">
            {/* select exam */}
            <div>
              <label className="mb-3 block text-base font-medium">
                Exams question appeared in
              </label>
              <div className="flex-wrap md:flex-row gap-2">
                <button
                  className="my-2 btn rounded-xl "
                  style={{
                    background:
                      selectJEE_Mains === false ? "#1565C0" : "#ffffff",
                    color: selectJEE_Mains === false ? "#ffffff" : "#000000",
                  }}
                  onClick={() => {
                    setSelectJEE_Mains(!selectJEE_Mains);
                    if (selectJEE_Mains) {
                      addSubject("JEE_Mains");
                    } else {
                      removeSubject("JEE_Mains");
                      console.log(myArray);
                    }
                  }}
                >
                  JEE_Mains{" "}
                  {selectJEE_Mains === false ? (
                    <FaTrashAlt className="ml-2"></FaTrashAlt>
                  ) : (
                    <FaPlusCircle className="ml-2"></FaPlusCircle>
                  )}
                </button>
                <button
                  className="my-2 btn rounded-xl "
                  style={{
                    background: selectChem === false ? "#1565C0" : "#ffffff",
                    color: selectChem === false ? "#ffffff" : "#000000",
                  }}
                  onClick={() => {
                    setSelectChem(!selectChem);
                    if (selectChem) {
                      addSubject("JEE_Advance");
                    } else {
                      myArray = myArray.filter(
                        (myArray) => myArray !== "JEE_Advance"
                      );
                      console.log(myArray);
                    }
                  }}
                >
                  JEE_Advance{" "}
                  {selectChem === false ? (
                    <FaTrashAlt className="ml-2"></FaTrashAlt>
                  ) : (
                    <FaPlusCircle className="ml-2"></FaPlusCircle>
                  )}
                </button>
                <button
                  className="my-2 btn rounded-xl "
                  style={{
                    background: selectNEET === false ? "#1565C0" : "#ffffff",
                    color: selectNEET === false ? "#ffffff" : "#000000",
                  }}
                  onClick={() => {
                    setSelectNEET(!selectNEET);
                    if (selectNEET) {
                      addSubject("NEET");
                    } else {
                      myArray = myArray.filter((myArray) => myArray !== "NEET");
                      console.log(myArray);
                    }
                  }}
                >
                  NEET{" "}
                  {selectNEET === false ? (
                    <FaTrashAlt className="ml-2"></FaTrashAlt>
                  ) : (
                    <FaPlusCircle className="ml-2"></FaPlusCircle>
                  )}
                </button>
              </div>
            </div>
            {/* exam selected */}
            <div className="mb-2 mt-2">
              <label className="mb-3 block text-base font-medium">
                Exams selected
              </label>
              {myArray.map((element, index) => {
                return (
                  <div key={index}>
                    <ul className="flex w-max">
                      <li className="flex flex-row w-max">• {element}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* add tags  */}
            <div>
              <div className="flex-wrap md:flex-row gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  Tags
                  <input
                    type="text"
                    onChange={(e) => setTag(e.target.value)}
                    className="grow"
                    placeholder="separated by commas"
                  />
                </label>
                
              </div>
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Type of Question</span>
              </div>
              <select
                className="select select-bordered"
                onChange={(e) => {
                  setType(e.target.value);
                  console.log(type);
                }}
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Single Correct</option>
                <option>Multiple Correct</option>
                <option>Numerical/Fill in the Blanks</option>
                <option>Subjective</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Subject</span>
              </div>
              <select
                className="select select-bordered mb-2"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Maths</option>
                <option>Bio</option>
              </select>
            </label>
            <textarea
              className="textarea w-full input-bordered"
              placeholder="Question"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            ></textarea>
            <label className="input input-bordered flex items-center gap-2">
              OP1
              <input
                type="text"
                onChange={(e) => setOp1(e.target.value)}
                className="grow"
                placeholder="Option 1"
              />
              <input
                type="radio"
                onChange={(e) => {
                  setCorrect("op1");
                }}
                name="radio-1"
                className="radio"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              OP2
              <input
                type="text"
                onChange={(e) => setOp2(e.target.value)}
                className="grow"
                placeholder="Option 2"
              />
              <input
                type="radio"
                onChange={(e) => {
                  setCorrect("op2");
                }}
                name="radio-1"
                className="radio"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              OP3
              <input
                type="text"
                onChange={(e) => setOp3(e.target.value)}
                className="grow"
                placeholder="Option 3"
              />
              <input
                type="radio"
                onChange={(e) => {
                  setCorrect("op3");
                }}
                name="radio-1"
                className="radio"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              OP4
              <input
                type="text"
                onChange={(e) => setOp4(e.target.value)}
                className="grow"
                placeholder="Option 4"
              />
              <input
                type="radio"
                onChange={(e) => {
                  setCorrect("op4");
                }}
                name="radio-1"
                className="radio"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Explanation
              <input
                type="text"
                onChange={(e) => setExplanation(e.target.value)}
                className="grow"
                placeholder="Explanation"
              />
            </label>
            
          </div>
          <button
            className="btn mt-2"
            onClick={(e) => {
              console.log(question);

              if (question) {
                onUpload();
              }
              
            }}
          >
            {question ? "Subbmit" : "Close"}
          </button>
          {/* </form> */}
        </div>
      </dialog>
      <div>
        {quest.map((item) => (
            <QuestionCard item={item} /> // Adjust based on your data structure
          ))}
      </div>
    </div>
  );
}

export default Questions;
