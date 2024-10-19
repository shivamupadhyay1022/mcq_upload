import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Editor from "./Editor";
import { MathJaxProvider, MathJaxHtml,} from "mathjax3-react";


function QuestionCard(props) {
  const item = props.item;
  const [question, setQuestion] = useState();
  const [tag, setTag] = useState();
  const [op1, setOp1] = useState();
  const [op2, setOp2] = useState();
  const [op3, setOp3] = useState();
  const [op4, setOp4] = useState();
  const [correct, setCorrect] = useState();
  const [subject, setSubject] = useState();
  const [explanation, setExplanation] = useState();
  const [type, setType] = useState();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  async function handleDelete(id) {
    try {
      const { data, error } = await supabase
        .from("questions")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  async function onUpload() {
    try {
      const { data, error } = await supabase
        .from("questions")
        .update({
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
        .eq("id", item.id);
      if (error) throw error;
      window.location = window.location;
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MathJaxProvider>
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <div className="badge badge-neutral">
            {item.type || "Type of Question"}
          </div>
          <div className="badge badge-neutral">{item.tags || "Subject"}</div>
          {/* <h1>{item.tags}</h1> */}
          {/* </MathJaxContext> */}
          <div className="badge badge-neutral">{item.subject || "Subject"}</div>
          {/* delete button */}
          <button
            className="btn btn-square btn-sm"
            onClick={(e) => {
              handleDelete(item.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          {/* edit button */}
          <button
            className="btn btn-square btn-sm"
            onClick={() => {
              onOpenModal();
              openUpdate(items);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
        {/* info */}
        
        <div>
          <p>{<MathJaxHtml html={item.question}/> || "question"}</p>
          <p>
            <span>Option 1:</span> <span>{<MathJaxHtml html={item.option1}/> || "op"}</span>
          </p>
          <p>
            <span>Option 2:</span> <span>{<MathJaxHtml html={item.option2}/> || "op"}</span>
          </p>
          <p>
            <span>Option 3:</span> <span>{<MathJaxHtml html={item.option3}/>|| "op"}</span>
          </p>
          <p>
            <span>Option 4:</span> <span>{<MathJaxHtml html={item.option4}/> || "op"}</span>
          </p>
          <p>
            <span>Correct:</span> <span>{item.correct || "correct"}</span>
          </p>
          <p>
            <span>Explanation</span>{" "}
            <span>{<MathJaxHtml html={item.explanation}/> || "correct"}</span>
          </p>
        </div>
        {/* update dialog */}
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
                      defaultValue={item.tags}
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
                  }}
                  defaultValue={item.type}
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
                  defaultValue={item.subject}
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
                defaultValue={item.question}
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
                  defaultValue={item.option1}
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
                  defaultValue={item.option2}
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
                  defaultValue={item.option3}
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
                  defaultValue={item.option4}
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
                  defaultValue={item.correct}
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
                  defaultValue={item.explanation}
                  placeholder="Explanation"
                  required
                />
              </label>
              <Editor />
            </div>
            <button
              className="btn mt-2"
              onClick={(e) => {

                onUpload();
              }}
            >
              {question ? "Subbmit" : "Close"}
            </button>
            {/* </form> */}
          </div>
        </dialog>
      </div>
    </div>
    </MathJaxProvider>
  );
}

export default QuestionCard;
