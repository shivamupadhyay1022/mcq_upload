import React, { useReducer, useCallback, useState } from "react";
import { supabase } from "../supabase";
import uploadToImgBB from "./uploadToImgBB";
import { toast } from "react-toastify";
import "mathlive";

const initialState = (item) => ({
  id: item.id,
  question: item.question || "",
  tags: item.tags || "",
  option1: item.option1 || "",
  option2: item.option2 || "",
  option3: item.option3 || "",
  option4: item.option4 || "",
  correct: item.correct || "",
  subject: item.subject || "",
  explanation: item.explanation || "",
  type: item.type || "",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, open: !state.open };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "DELETE":
      return null;
    default:
      return state;
  }
};

const QuestionCard = React.memo(({ item, onDelete }) => {
  const [state, dispatch] = useReducer(reducer, item, initialState);
  const [open, setOpen] = useState(false);
  const [mathInput, setMathInput] = useState("");

  const toggleModal = useCallback(() => dispatch({ type: "TOGGLE_MODAL" }), []);

  const handleDelete = useCallback(async () => {
    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", state.id);
      toast.success("Question Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (error) throw error;
    } catch (error) {
      console.error("Delete Error:", error);
    }
  }, [state.id, onDelete]);

  const onUpload = useCallback(async () => {
    try {
      const { error } = await supabase
        .from("questions")
        .update(state)
        .eq("id", state.id);
        toast.success("Question Updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      if (error) throw error;
      toggleModal();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Error :"+error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [state, toggleModal]);

  const handleChange = useCallback((e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }, []);

  const renderImageOrText = useCallback(
    (content) =>
      content.startsWith("http") ? (
        <img
          src={content}
          alt="content-img"
          className="h-auto py-2"
          loading="lazy"
        />
      ) : (
        <math-field style={{ backgroundColor: "inherit" }} read-only>
          {content}
        </math-field>
      ),
    []
  );

  const handleUpload = async (event, field) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    try {
      const url = await uploadToImgBB(file);
      if (url) {
        dispatch({ type: "UPDATE_FIELD", field, value: url });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!state) return null;

  return (
    <div className="card w-full  bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <span className="badge badge-neutral">{state.id}</span>
          <span className="badge badge-neutral">{state.type || "Type"}</span>
          <span className="badge badge-neutral">{state.tags || "Tags"}</span>
          <span className="badge badge-neutral">
            {state.subject || "Subject"}
          </span>

          <button className="btn btn-square btn-sm" onClick={handleDelete}>
            🗑️
          </button>
          <button
            className="btn btn-square btn-sm"
            onClick={() => setOpen(!open)}
          >
            ✏️
          </button>
        </div>

        {renderImageOrText(state.question)}

        {[1, 2, 3, 4].map((num) => (
          <p key={num}>
            <span>Option {num}:</span>{" "}
            {renderImageOrText(state[`option${num}`])}
          </p>
        ))}

        <p>
          <span>Correct:</span> {state.correct || "Not Selected"}
        </p>
        <p>
          <span>Explanation:</span> {renderImageOrText(state.explanation)}
        </p>

        {open && (
          <dialog className="modal modal-open">
            <div className="modal-box flex flex-col max-w-[48rem]">
              <div className="flex justify-between">
                <h3 className="font-bold my-2 text-lg">Update Question</h3>
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => setOpen(!open)}
                >
                  ❌
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  name="tags"
                  type="text"
                  className="input input-bordered"
                  value={state.tags}
                  onChange={handleChange}
                />

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Type of Question</span>
                  <select
                    className="select select-bordered"
                    required
                    value={state.type}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "type",
                        value: e.target.value,
                      })
                    }
                  >
                    <option selected>Pick one</option>
                    <option>Single Correct</option>
                    <option>Multiple Correct</option>
                    <option>Numerical/Fill in the Blanks</option>
                    <option>Subjective</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs">
                  <span className="label-text">Subject</span>
                  <select
                    className="select select-bordered mb-2"
                    required
                    value={state.subject}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "subject",
                        value: e.target.value,
                      })
                    }
                  >
                    <option selected   >Pick one</option>
                    <option value={"Physics"} >Physics</option>
                    <option value={"Chemistry"} >Chemistry</option>
                    <option value={"Maths"} >Maths</option>
                    <option value={"Bio"} >Bio</option>
                  </select>
                </label>

                <label className="input h-fit input-bordered">
                  Question
                  {state.question.startsWith("ht") ? (
                    <img
                      src={state.question}
                      alt="question-img"
                      className="h-auto py-2"
                      loading="lazy"
                    />
                  ) : (
                    <textarea
                      name="question"
                      className="textarea w-full input-bordered"
                      value={state.question}
                      onChange={handleChange}
                    ></textarea>
                  )}
                  <input
                    type="file"
                    className="btn input file-input p-1 justify-self-end"
                    onChange={(e) => handleUpload(e, "question")}
                  />
                </label>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex w-full gap-2">
                    <span>Option {num}</span>
                    {state[`option${num}`].startsWith("ht") ? (
                      <img
                        src={state[`option${num}`]}
                        alt="option-img"
                        loading="lazy"
                      />
                    ) : (
                      <input
                        name={`option${num}`}
                        type="text"
                        className="grow input input-bordered"
                        value={state[`option${num}`]}
                        onChange={handleChange}
                      />
                    )}

                    <input
                      type="file"
                      className="btn input file-input p-1 justify-self-end"
                      onChange={(e) => handleUpload(e, `option${num}`)}
                    />
                    <input
                      type="radio"
                      checked={state.correct === `option${num}`}
                      onChange={() =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "correct",
                          value: `option${num}`,
                        })
                      }
                    />
                  </div>
                ))}

                <label className="input h-auto input-bordered">
                  Explanation
                  <textarea
                    name="explanation"
                    className="w-full textarea textarea-bordered overflow-hidden"
                    value={state.explanation}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  ></textarea>
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <math-field
                  onInput={(e) => setMathInput(e.target.value)}
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "inherit",
                    zIndex: "50000",
                  }}
                ></math-field>
                <p className="w-full border-2 border-white">{mathInput}</p>
                <math-field
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "inherit",
                  }}
                  read-only
                >
                  {mathInput}
                </math-field>
              </div>
              <button className="btn mt-2 mb-96" onClick={onUpload}>
                Submit
              </button>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
});

export default QuestionCard;
