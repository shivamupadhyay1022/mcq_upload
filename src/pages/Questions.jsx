import React from "react";
import { useEffect } from "react";
import { supabase } from "../supabase";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
// import Editor from "../components/Editor";
import "./Question.css";
import { toast } from "react-toastify";
import uploadToImgBB from "../components/uploadToImgBB";

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
  const [open, setOpen] = useState(false);
  const [editorValue, changeEditorValue] = useState("");
  const [lowervalue, SetLowwerValue] = useState(0);
  const [uppervalue, SetUpperValue] = useState(5);
  const [showdelaytext, setShowDelayedText] = useState(false);
  const [search, SetSearch] = useState(null);
  const [seed, setSeed] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  // const CLIENT_ID =
  //   "1000143815497-00gnp711u39aimapadfiohj3sckmnpd3.apps.googleusercontent.com";
  // const API_KEY = "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";
  // const SCOPES = "https://www.googleapis.com/auth/drive.file";

  async function onUpload() {
    try {
      const { data, error } = await supabase
        .from("questions")
        .insert({
          subject: subject,
          question: question,
          type: type,
          option1: op1,
          option2: op2,
          option3: op3,
          option4: op4,
          correct: correct,
          explanation: explanation,
          tags: tag,
        })
        .single();
      if (error) {
        toast.error("Error adding question" + error);
        console.log(error);
        throw error;
      }
      toast.success("Question added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error adding question" + error);
    }
  }

  //   function setAlert() {
  //     alert = !alert;
  //   }

  useEffect(() => {
    setShowDelayedText(false);
    setTimeout(() => {
      setShowDelayedText(true);
    }, 2000);
    getQuestions();
    console.log("reload");
  }, [uppervalue,sortOrder]);

  async function getQuestions() {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("id", { ascending: sortOrder === "asc" })
        .range(lowervalue, uppervalue);
      if (error) throw error;
      if (data != null) {
        setQuest(data);
      }
    } catch (error) {}
  }

  async function getsearchquestion() {
    console.log("Search");
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .like("question", "%" + search + "%")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setQuest(data);
      }
    } catch (error) {}
  }

  async function handleSearch() {
    await getsearchquestion();
    setSeed(Math.random());
  }

  async function getTagsearchquestion() {
    console.log("Search");
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .like("tags", "%" + search + "%")
        .limit(10)
        .range(lowervalue, uppervalue);
      if (error) throw error;
      if (data != null) {
        setQuest(data);
      }
    } catch (error) {}
  }

  async function handleTagSearch() {
    await getTagsearchquestion();
    setSeed(Math.random());
  }

  const handleUpload = async (event, field) => {
    const file = event.target.files[0];
    const metadata = {
      name: file.name,
      mimeType: file.type,
    };
    // const form = new FormData();
    // form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    // form.append('file', file);

    try {
      // const uploadResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
      //   },
      //   body: form,
      // });
      // const uploadedFile = await uploadResponse.json();

      // if (uploadedFile.id) {
      //   // Set file permissions to make it public
      //   await fetch(`https://www.googleapis.com/drive/v3/files/${uploadedFile.id}/permissions`, {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       role: 'reader',
      //       type: 'anyone',
      //     }),
      //   });

      //   // Get a public link

      //   const publicLink = `https://drive.google.com/uc?id=${uploadedFile.id}`;
      //   console.log('Public link:', publicLink);
      //   alert(`Image uploaded! View it at: ${publicLink}`);
      // } else {
      //   console.error('File upload failed:', uploadedFile);
      // }
      if (!file) {
        alert("Please select an image first!");
        return;
      }
      const url = await uploadToImgBB(file);
      if (url) {
        setUrl(url);
        console.log("Embed URL:", url);
      }

      switch (field) {
        case "question":
          setQuestion(url);
          break;
        case "op1":
          setOp1(url);
          break;
        case "op2":
          setOp2(url);
          break;
        case "op3":
          setOp3(url);
          break;
        case "op4":
          setOp4(url);
          break;
        case "explanation":
          setExplanation(url);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
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
          {/* Search bar */}

          <label className="input input-bordered flex items-center gap-2">
            <button className="btn" onClick={() => console.log(quest)}>
              Console log
            </button>
            <input
              type="text"
              className="grow h-auto"
              placeholder="Search"
              onChange={(e) => {
                SetSearch(e.target.value);
              }}
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
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
          <label className="input input-bordered flex items-center gap-2">
            <p className="" >
             Search tags
            </p>
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
                handleTagSearch();
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
            // when searching
            <div key={seed} className="mx-8">
              <h1 className="w-full text-center text-xl sm:text-lg">
                Jee Mains
              </h1>
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
                <button onClick={() => onOpenModal()}>Add new Question</button>
              </div>
              {/* add question dialog */}
              <dialog className={open ? "modal modal-open" : " modal"}>
                <div className="modal-box flex flex-col max-w-[48rem] ">
                  <div className="flex justify-between  ">
                    <h3 className={"font-bold my-2 text-lg "}>
                      Add new question here
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
                    {/* add tags  */}
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
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Type of Question</span>
                      </div>
                      <select
                        className="select select-bordered"
                        required
                        onChange={(e) => {
                          setType(e.target.value);
                          // console.log(type);
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
                        required
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
                      placeholder={question}
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
                      Correct
                      <input
                        type="text"
                        onChange={(e) => setOp4(e.target.value)}
                        className="grow"
                        placeholder="Option 4"
                        required
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Explanation
                      <input
                        type="text"
                        onChange={(e) => setExplanation(e.target.value)}
                        className="grow"
                        placeholder="Explanation"
                        required
                      />
                    </label>
                    {/* <Editor /> */}
                    {/* <FormulaEditor 
            placeholder = {'Start typing...'}
        /> */}
                  </div>
                  <button
                    className="btn mt-2"
                    onClick={(e) => {
                      // console.log(question);

                      onUpload();
                    }}
                  >
                    {question ? "Subbmit" : "Close"}
                  </button>
                  {/* </form> */}
                </div>
              </dialog>
              <div></div>
              <div>
                {quest.map((item) => (
                  <QuestionCard key={Math.random()} item={item} /> // Adjust based on your data structure
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
            // when not searching
            <div className="mx-8">
              <h1 className="w-full text-center text-xl sm:text-lg">
                Jee Mains
              </h1>
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
                <button onClick={() => onOpenModal()}>Add new Question</button>
              </div>
              {/* add question dialog */}
              <dialog className={open ? "modal modal-open" : " modal"}>
                <div className="modal-box flex flex-col max-w-[48rem] ">
                  <div className="flex justify-between  ">
                    <h3 className={"font-bold my-2 text-lg "}>
                      Add new question here
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
                    {/* add tags  */}
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
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Type of Question</span>
                      </div>
                      <select
                        className="select select-bordered"
                        required
                        onChange={(e) => {
                          setType(e.target.value);
                          // console.log(type);
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
                        required
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
                    {/* set question */}
                    {question?.substring(0, 2) === "ht" ? (
                      <img
                        src={question}
                        alt="Screenshot-2025-01-15-051936"
                        border="0"
                      ></img>
                    ) : (
                      <textarea
                        className="textarea w-full input-bordered"
                        value={question}
                        onChange={(e) => {
                          setQuestion(e.target.value);
                        }}
                      ></textarea>
                    )}

                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "question")}
                      />
                    </div>
                    {/* option 1 */}
                    <label className="input input-bordered flex items-center gap-2">
                      OP1
                      {op1?.substring(0, 2) === "ht" ? (
                        <img
                          src={op1}
                          alt="Screenshot-2025-01-15-051936"
                          border="0"
                        ></img>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setOp1(e.target.value)}
                          className="grow"
                          placeholder="Option 1"
                          value={op1}
                        />
                      )}
                      <input
                        type="radio"
                        onChange={(e) => {
                          setCorrect("op1");
                        }}
                        name="radio-1"
                        className="radio"
                      />
                    </label>
                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "op1")}
                      />
                    </div>
                    {/* option 2 */}
                    <label className="input input-bordered flex items-center gap-2">
                      OP2
                      {op2?.substring(0, 2) === "ht" ? (
                        <img
                          src={op2}
                          alt="Screenshot-2025-01-15-051936"
                          border="0"
                        ></img>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setOp2(e.target.value)}
                          className="grow"
                          placeholder="Option 2"
                          value={op2}
                        />
                      )}
                      <input
                        type="radio"
                        onChange={(e) => {
                          setCorrect("op2");
                        }}
                        name="radio-1"
                        className="radio"
                      />
                    </label>
                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "op2")}
                      />
                    </div>
                    {/* option 3 */}
                    <label className="input input-bordered flex items-center gap-2">
                      OP3
                      {op3?.substring(0, 2) === "ht" ? (
                        <img
                          src={op3}
                          alt="Screenshot-2025-01-15-051936"
                          border="0"
                        ></img>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setOp3(e.target.value)}
                          className="grow"
                          placeholder="Option 3"
                          value={op3}
                        />
                      )}
                      <input
                        type="radio"
                        onChange={(e) => {
                          setCorrect("op3");
                        }}
                        name="radio-1"
                        className="radio"
                      />
                    </label>
                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "op3")}
                      />
                    </div>
                    {/* option 4 */}
                    <label className="input input-bordered flex items-center gap-2">
                      OP4
                      {op4?.substring(0, 2) === "ht" ? (
                        <img
                          src={op4}
                          alt="Screenshot-2025-01-15-051936"
                          border="0"
                        ></img>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setOp4(e.target.value)}
                          className="grow"
                          placeholder="Option 4"
                          value={op4}
                        />
                      )}
                      <input
                        type="radio"
                        onChange={(e) => {
                          setCorrect("op4");
                        }}
                        name="radio-1"
                        className="radio"
                      />
                    </label>
                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "op4")}
                      />
                    </div>
                    {/* <label className="input input-bordered flex items-center gap-2">
                      Correct
                      <input
                        type="text"
                        onChange={(e) => setCorrect(e.target.value)}
                        className="grow"
                        placeholder="Option 4"
                        required
                      />
                    </label> */}
                    {/* explanation */}
                    <label className="input input-bordered flex items-center gap-2">
                      Explanation
                      {explanation?.substring(0, 2) === "ht" ? (
                        <img
                          src={explanation}
                          alt="Screenshot-2025-01-15-051936"
                          border="0"
                          className="h-auto py-2"
                        ></img>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setExplanation(e.target.value)}
                          className="grow"
                          placeholder="Explanation"
                          value={explanation}
                        />
                      )}
                    </label>
                    {/* file input */}
                    <div className="flex justify-end">
                      {/* <button onClick={handleAuthClick}>
                        Sign in with Google
                      </button> */}
                      <input
                        type="file"
                        className="btn input file-input p-1 justify-self-end"
                        onChange={(e) => handleUpload(e, "explanation")}
                      />
                    </div>
                    {/* <Editor /> */}
                    {/* <FormulaEditor 
              placeholder = {'Start typing...'}
          /> */}
                  </div>
                  <button
                    className="btn mt-2"
                    onClick={(e) => {
                      // console.log(question);

                      onUpload();
                    }}
                  >
                    {question ? "Subbmit" : "Close"}
                  </button>
                  {/* </form> */}
                </div>
              </dialog>

              {/* Question List       */}

              <div>
                {quest.map((item) => (
                  <QuestionCard item={item} /> // Adjust based on your data structure
                ))}
              </div>

              {/* Pagination */}

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

export default Questions;
