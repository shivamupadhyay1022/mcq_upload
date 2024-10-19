import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase";
import { uid } from "uid";

import { push } from "firebase/database";
import QuestionCard from "../components/QuestionCard";
var alert = false;

function Advance() {
  const [year, chngyear] = useState();
  const [sub, chngSub] = useState();
  const [isOpen, setisOpen] = useState(false);
  const [question, setQuestion] = useState();
  const [op1, setOp1] = useState();
  const [op2, setOp2] = useState();
  const [op3, setOp3] = useState();
  const [op4, setOp4] = useState();
  const [tempUidd, setTempUidd] = useState("");
  const [correct, setCorrect] = useState();
  const [msg, setMsg] = useState();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function setAlert() {
    alert = !alert;
  }

  function checkmsg() {
    if (!op1 || !op2 || !op3 || !op4) setAlert();
    else setMsg("Success");
  }

  const onUpload = () => {
    //registered
    const uidd = uid();
    const path = ref(db, "advance/" + year + "/" +sub + "/" + uidd);
    set(path, {
      question: question,
      op1: op1,
      op2: op2,
      op3: op3,
      op4: op4,
      correct: correct,
      uid: uidd,
    })
      .then((e) => {
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
      });
    // toast.success(user.email + " Registered", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      const tempref = "advance/" + year;
      const dataRef = ref(db, "advance/" +year+ "/"+sub); // Replace with your reference
      // dataRef.orderByChild('nestedObject.subject').equalTo('Chemistry')
      if (dataRef) {
        onValue(
          dataRef,
          (snapshot) => {
            if (snapshot) {
              const retrievedData = snapshot.val();
              setData(retrievedData);
            }
          },
          (error) => {
            console.error("Error fetching data:", error);
          }
        );
        // const filteredData = data.filter(item => item.email === 'nilesh@gma.com');
        // setFilteredData(filteredData)
      }
    };
    fetchData()
      .then((e) => {
        // console.log(Object.values(data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [year,sub]);

  return (
    <div className="mx-8">
              <h1 className="w-full text-center text-xl sm:text-lg" >Jee Advance</h1>

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
        <details
          role="button"
          className="dropdown dropdown-start  mr-8"
        >
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
          className={year && sub ? "show btn" : "hidden"}
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add new Question
        </button>
      </div>
      {/* add question dialog */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex justify-between">
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
          </div>
          <button
            className="btn mt-2"
            onClick={(e) => {
              // console.log(question);

              if (question) {
                checkmsg();
              }
              onUpload();
            }}
          >
            {question ? "Subbmit" : "Close"}
          </button>
          {/* </form> */}
        </div>
      </dialog>
      <div>
        {data &&
          Object.values(data).map((item) => (
            <Question item={item} year={year} sub={sub} exam="advance" /> // Adjust based on your data structure
          ))}
      </div>
    </div>
  );
}

export default Advance;
