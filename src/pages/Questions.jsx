import React, { useState, useEffect, useCallback, useReducer } from "react";
import { supabase } from "../supabase";
import QuestionCard from "../components/QuestionCard";
import { toast } from "react-toastify";
import uploadToImgBB from "../components/uploadToImgBB";
import "./Question.css";
import "mathlive";

const initialState = {
  question: "",
  tags: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correct: "",
  subject: "",
  explanation: "",
  type: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, open: !state.open };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [pagination, setPagination] = useState({ lower: 0, upper: 5 });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);
  const [mathInput, setMathInput] = useState("");

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev);
    dispatch({ type: "RESET" });
  }, []);

  // Fetch questions
  const getQuestions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("id", { ascending: sortOrder === "asc" })
        .range(pagination.lower, pagination.upper);

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [sortOrder, pagination]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  // Handle form changes
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  // Handle file upload
  const handleUpload = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const url = await uploadToImgBB(file);
      if (url) {
        dispatch({
          type: "UPDATE_FIELD",
          field: field,
          value: url,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Add a new question
  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("questions").insert(state);
      if (error) throw error;

            toast.success("Question added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
      toggleModal();
      getQuestions();
    } catch (error) {
      toast.error("Error adding question");
      console.error(error);
    }
  };

  // Search questions
  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .ilike("question", `%${search}%`)
        .limit(10);
      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  

  return (
    <div className="container mx-auto p-4">
      {/* Search & Sort */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered grow"
          placeholder="Search questions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Add Question Button */}
      <button className="btn btn-primary mb-4" onClick={() => setOpen(true)}>
        Add New Question
      </button>

      {/* Add Question Modal */}
      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box flex flex-col max-w-[48rem]">
            <div className="flex justify-between">
              <h3 className="font-bold my-2 text-lg">Add Question</h3>
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
                placeholder="Tags"
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
                  <option selected>Pick one</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Maths</option>
                  <option>Bio</option>
                  <option value={"English"}>English</option>
                  <option value={"Logical"}>Logical</option>
                </select>
              </label>

              <label className="input h-fit input-bordered">
                  Question
                  <textarea
                    name="question"
                    className="textarea w-full input-bordered"
                    value={state.question}
                    onChange={handleChange}
                  ></textarea>
                  <input
                    type="file"
                    className="btn input file-input p-1 justify-self-end"
                    onChange={(e) => handleUpload(e, "question")}
                  />
                </label>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex w-full gap-2">
                    <span>Option {num}</span>

                    <input
                      name={`option${num}`}
                      type="text"
                      className="grow input input-bordered"
                      value={state[`option${num}`]}
                      onChange={handleChange}
                    />

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
                  <input
                      type="file"
                      className="btn input file-input p-1 justify-self-end"
                      onChange={(e) => handleUpload(e, `explanation`)}
                    />
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
            <button className="btn mt-2 mb-96" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </dialog>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((item) => (
          <QuestionCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between my-4">
        <button
          className="btn"
          disabled={pagination.lower === 0}
          onClick={() =>
            setPagination((prev) => ({
              lower: prev.lower - 5,
              upper: prev.upper - 5,
            }))
          }
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={() =>
            setPagination((prev) => ({
              lower: prev.lower + 5,
              upper: prev.upper + 5,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Questions;
