import React, { useState } from "react";
import { supabase } from "../supabase";
import QuestionCard from "./QuestionCard";
import { Navigate, useNavigate } from "react-router-dom";

function Examcard(props) {
    const [Questionlist, setQuestionlist] = useState([]);
  const item = props.item;
  const [tags, setTag] = useState();
  const [name, setName] = useState();
  const [duration, setDuration] = useState();
  const [questionid, setQuestionId] = useState();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      const { data, error } = await supabase
        .from("exams")
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
        .from("exams")
        .update({
          Name: name,
          Tags: tags,
          Duration: duration,
          Questions: questionid,
        })
        .eq("id", item.id);
      if (error) throw error;
      window.location = window.location;
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  }
  //   fetch exams
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
    setQuestionlist(list)
    console.log(Questionlist)
  }

  async function splitstring() {
    var str_array = item.Questions.split(",");
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:
    }
    console.log(str_array);
    return str_array;
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <div className="badge badge-neutral">{item.id || "id"}</div>
          <div className="badge badge-neutral">{item.Tags || "tags"}</div>
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
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          {/* view button */}
          <button
            className="btn btn-square btn-sm"
            onClick={(e) => {
            //   document.getElementById("my_modal_1").showModal();
            //   getQuestionlist();
            navigate(`/viewexamquestions/${item.Questions}`)
            //   splitstring();
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          {/* edit button */}
          <button
            className="btn btn-square btn-sm"
            onClick={() => {
              onUpload(items);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>

        {/* info */}

        <div>
          <p>{item.Name || "question"}</p>
          <p>{item.Questions || "question"}</p>
          <p>{item.Duration || "question"}</p>
        </div>

        {/* update dialog */}
        <dialog className={open ? "modal modal-open" : " modal"}>
          <div className="modal-box flex flex-col max-w-[48rem] ">
            <div className="flex justify-between  ">
              <h3 className={"font-bold my-2 text-lg "}>Update Exam here</h3>
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
                  value={item.Tags}
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
                  value={item.Name}
                  className="input input-bordered w-full "
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
              {/* Duration  */}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Duration {"(in Mins)"}</span>
                </div>
                <input
                  type="text"
                  value={item.Duration}
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
                  value={item.Questions}
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
                onUpload();
              }}
            >
              Update
            </button>
            {/* </form> */}
          </div>
        </dialog>
        {/* view dialog */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box max-w-[900px]">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>
                {Questionlist.map((item) => (
                  <QuestionCard item={item} /> // Adjust based on your data structure
                ))}
              </div>
            <div className="modal-action">
              <form method="dialog" className="btn absolute right-2 top-2">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">X</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Examcard;
