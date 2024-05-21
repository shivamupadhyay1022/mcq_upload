import React,{useState} from "react";
import { db } from "../firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uid } from "uid";
function QuestionCard2({ item, year, exam, sub }) {
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

  const handleDelete = (uid) => {
    remove(ref(db, `/${exam}/${year}/${sub}/${uid}`))
      .then(() => {
        console.log("Deleted");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function checkmsg() {
    if (!op1 || !op2 || !op3 || !op4) setAlert();
    else setMsg("Success");
  }

  const openUpdate = () => {
    setCorrect(item.correct);
    setQuestion(item.question);
    setOp1(item.op1);
    setOp2(item.op2);
    setOp3(item.op3);
    setOp4(item.op4);
    document.getElementById("my_modal_4").showModal();
    // update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
    //   todo: todo,
    //   tempUidd: tempUidd,
    // });
  };
    function onUpdate() {
    const path = ref(db,`/${exam}/${year}/${sub}/${item.uid}`);
    console.log(path);
    update(path, {
      question:question,
      op1:op1,
      op2:op2,
      op3:op3,
      op4:op4,
      correct:correct,
      uid:item.uid
    }).then((e)=>{
      console.log("success")
    }).catch((e)=>{
      console.log(e);
    });
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          {/* delete button */}
          <button
            className="btn btn-square btn-sm"
            onClick={(e) => {
              console.log(item.uid);
              handleDelete(item.uid);
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
            onClick={(e) => {
              console.log(item.uid);
              openUpdate();
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
        <p>{item.question || "question"}</p>
        <p>
          <span>Option 1:</span> <span>{item.op1 || "op"}</span>
        </p>
        <p>
          <span>Option 2:</span> <span>{item.op2 || "op"}</span>
        </p>
        <p>
          <span>Option 3:</span> <span>{item.op3 || "op"}</span>
        </p>
        <p>
          <span>Option 4:</span> <span>{item.op4 || "op"}</span>
        </p>
        <p>
          <span>Correct:</span> <span>{item.correct || "correct"}</span>
        </p>
        </div>
        {/* update dialog */}
        <dialog id="my_modal_4" className="modal">
        <div className="modal-box flex flex-col">
        <div className="flex justify-between">
            <h3 className={"font-bold my-2 text-lg "}>Update question here</h3>
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
                  placeholder={op1}
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
                  placeholder={op2}
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
                  placeholder={op3}
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
                  placeholder={op4}
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
                  contentEditable={false}
                  className="grow text-gray400"
                  placeholder={correct}
                />
              </label>
            </div>
            <button
              className="btn mt-2"
              onClick={(e) => {
                console.log(question);

                if (question) {
                  checkmsg();
                }
                onUpdate();
              }}
            >
              {question ? "Subbmit" : "Close"}
            </button>
          {/* </form> */}
        </div>
      </dialog>
      </div>
    </div>
  );
}

export default QuestionCard2;
