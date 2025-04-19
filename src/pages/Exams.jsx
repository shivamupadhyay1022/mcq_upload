import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import { supabase } from "../supabase";
import Examcard from "../components/Examcard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Exams() {
  const [tags, setTag] = useState("");
  const [search, SetSearch] = useState();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [questionid, setQuestionId] = useState("");
  const [open, setOpen] = useState();
  const [examlist, setExamList] = useState([]);
  const [alert, setAlert] = useState();

  const [lowervalue, SetLowwerValue] = useState(0);
  const [uppervalue, SetUpperValue] = useState(5);
  const [showdelaytext, setShowDelayedText] = useState(false);
  const [seed, setSeed] = useState(1);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setShowDelayedText(false);
    setTimeout(() => {
      setShowDelayedText(true);
    }, 2000);
    getExams();
    console.log("reload");
  }, [uppervalue]);

  const checkinput = () => {
    if (
      name.trim().length == 0 ||
      tags.trim().length == 0 ||
      duration.trim().length == 0 ||
      questionid.trim().length == 0
    ) {
      toast.error("Fill All Fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      onUpload();
    }
  };
  //   fetch exams
  async function getExams() {
    try {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .range(lowervalue, uppervalue);
      if (error) throw error;
      if (data != null) {
        setExamList(data);
      }
    } catch (error) {}
  }
  // Add exam
  async function onUpload() {
    try {
      const { data, error } = await supabase
        .from("exams")
        .insert({
          Name: name,
          Tags: tags,
          Duration: duration,
          Questions: questionid,
        })
        .single();
      if (error) {
        setAlert(error);
        throw error;
      }
      window.location.reload();
    } catch (error) {
      setAlert(error);
      console.log(error);
    }
  }

  return (
    <div>
        <ToastContainer/>
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
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow h-auto"
              placeholder="Search"
              onChange={(e) => {
                SetSearch(e.target.value);
              }}
            />
            <button
              className="btn my-2"
              onClick={() => {
                handleSearch();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
          {search ? (
            <div key={seed} className="mx-8">
              <h1 className="w-full text-center text-xl sm:text-lg">Exams</h1>
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
                {/* Add Exam button */}
                <button onClick={() => onOpenModal()}>Add new Exams</button>
              </div>
              {/* add question dialog */}
              <dialog className={open ? "modal modal-open" : " modal"}>
                <div className="modal-box flex flex-col max-w-[48rem] ">
                  <div className="flex justify-between  ">
                    <h3 className={"font-bold my-2 text-lg "}>
                      Add new Exam here
                    </h3>
                    <div className="modal-action -mt-1 ">
                      <button
                        onClick={() => {
                          onCloseModal();
                          console.log(open);
                        }}
                        className="btn btn-square btn-sm"
                      >
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
                    </div>
                  </div>

                  {/* <form> */}
                  <div className=" flex flex-col gap-3">
                    {/* select exam */}
                    {/* Name  */}
                    <div>
                      <div className="flex-wrap md:flex-row gap-2">
                        <label className="input input-bordered flex items-center gap-2">
                          Tags
                          <input
                            type="text"
                            onChange={(e) => setTag(e.target.value)}
                            className="grow"
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <textarea
                      className="textarea w-full input-bordered"
                      placeholder={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <button
                    className="btn mt-2"
                    onClick={(e) => {
                      checkinput();
                    }}
                  >
                    {name ? "Submit" : "Close"}
                  </button>
                  {/* </form> */}
                </div>
              </dialog>
              <div></div>
              <div>
                {examlist.map((item) => (
                  <Examcard key={item.id} item={item} /> // Adjust based on your data structure
                ))}
              </div>
              <div className="flex my-4 justify-between">
                <button
                  className="btn"
                  onClick={(e) => {
                    if (lowervalue > 0) {
                      e.preventDefault();
                      SetLowwerValue(lowervalue - 5);
                      SetUpperValue(uppervalue - 5);
                      console.log(uppervalue, lowervalue);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    SetUpperValue(uppervalue + 5);
                    SetLowwerValue(lowervalue + 5);
                    console.log(uppervalue, lowervalue);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-8">
              <h1 className="w-full text-center text-xl sm:text-lg">Exams</h1>
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
                {/* Add qsn button */}
                <button className="btn"  onClick={() => onOpenModal()}>Add new Exams</button>
              </div>
              {/* add question dialog */}
              <dialog className={open ? "modal modal-open" : " modal"}>
                <div className="modal-box flex flex-col max-w-[48rem] ">
                  <div className="flex justify-between  ">
                    <h3 className={"font-bold my-2 text-lg "}>
                      Add new Exam here
                    </h3>
                    <div className="modal-action -mt-1 ">
                      <button
                        onClick={() => {
                          onCloseModal();
                          console.log(open);
                        }}
                        className="btn btn-square btn-sm"
                      >
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
                    </div>
                  </div>

                  {/* <form> */}
                  <div className=" flex flex-col gap-3">
                    {/* select exam */}
                    {/* tags  */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">
                          Tags {"(Separated by commas)"}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        onChange={(e) => {
                          setTag(e.target.value);
                        }}
                      />
                    </label>
                    {/* name */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Exam's Name</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </label>
                    {/* Duration  */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">
                          Duration {"(in Mins)"}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        onChange={(e) => {
                          setDuration(e.target.value);
                        }}
                      />
                    </label>
                    {/* Question  */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">
                          Question IDs {"(separated by commas)"}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        onChange={(e) => {
                          setQuestionId(e.target.value);
                        }}
                      />
                    </label>
                  </div>

                  <button
                    className="btn mt-2"
                    onClick={(e) => {
                      checkinput();
                    }}
                  >
                    Update
                  </button>
                  {/* </form> */}
                </div>
              </dialog>
              <div></div>
              <div>
                {examlist.map((item) => (
                  <Examcard item={item} /> // Adjust based on your data structure
                ))}
              </div>
              <div className="flex my-4 justify-between">
                <button
                  className="btn"
                  onClick={(e) => {
                    if (lowervalue > 0) {
                      e.preventDefault();
                      SetLowwerValue(lowervalue - 5);
                      SetUpperValue(uppervalue - 5);
                      console.log(uppervalue, lowervalue);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    SetUpperValue(uppervalue + 5);
                    SetLowwerValue(lowervalue + 5);
                    console.log(uppervalue, lowervalue);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Exams;
