import React, { useState } from "react";
import { supabase } from "../supabase";

const TOPIC_MAP = {
  Mathematics: {
    BITSAT: ["Algebra", "Calculus", "Probability"],
    "JEE MAINS": ["Trigonometry", "Quadratic Equations"],
    "JEE ADVANCED": ["Vectors", "Complex Numbers"],
    NEET: ["Probability", "Statistics"],
  },
  Chemistry: {
    BITSAT: ["Physical", "Organic"],
    "JEE MAINS": ["Inorganic", "Organic"],
    "JEE ADVANCED": ["Physical", "Inorganic"],
    NEET: ["Biochemistry", "Organic"],
  },
  Biology: {
    BITSAT: ["Genetics", "Ecology"],
    "JEE MAINS": ["Genetics"],
    "JEE ADVANCED": ["Genetics"],
    NEET: ["Botany", "Zoology"],
  },
  English: {
    BITSAT: ["Grammar", "Comprehension"],
    "JEE MAINS": ["Comprehension"],
    "JEE ADVANCED": ["Comprehension"],
    NEET: ["Grammar"],
  },
  Logical: {
    BITSAT: ["Series", "Patterns"],
    "JEE MAINS": ["Reasoning"],
    "JEE ADVANCED": ["Reasoning"],
    NEET: ["Patterns"],
  },
};

const exams = ["BITSAT", "JEE MAINS", "JEE ADVANCED", "NEET",""];
const subjects = ["Chemistry", "Biology", "Maths", "English", "Logical",""];
const questionTypes = ["Single Correct", "Multiple Select", "True/False", "Numeric",""];
const difficulties = ["Easy", "Medium", "Hard",""];

function Express() {
  const [selectedExam, setSelectedExam] = useState("BITSAT");
  const [selectedSubject, setSelectedSubject] = useState("Maths");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedType, setSelectedType] = useState("Single Correct");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState(5);

  const [questionIds, setQuestionIds] = useState([]);
  const [paperIds, setPaperIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const availableTopics =
    TOPIC_MAP[selectedSubject]?.[selectedExam] || [];

  const handleGenerateQuiz = async () => {
    setLoading(true);

    let query = supabase.from("questions").select("id");

    // Exam as tag (case-insensitive)
    if (selectedExam) query = query.ilike("tags", `%${selectedExam}%`);
    // Subject
    if (selectedSubject) query = query.ilike("subject", `%${selectedSubject}%`);
    // Type
    if (selectedType) query = query.ilike("type", `%${selectedType}%`);
    // Difficulty
    if (selectedDifficulty) query = query.ilike("tags", `%${selectedDifficulty}%`);
    // Topic
    // if (selectedTopic) query = query.ilike("tags", `%${selectedTopic}%`);

    query = query.limit(numQuestions);

    const { data, error } = await query;
    setLoading(false);

    if (error) {
      setQuestionIds([]);
      alert("Error fetching questions: " + error.message);
      return;
    }
    console.log(data)
    setQuestionIds((data || []).map((q) => q.id));
  };

  // Add current questionIds to paperIds (no duplicates)
  const handleAddToPaper = () => {
    setPaperIds((prev) => Array.from(new Set([...prev, ...questionIds])));
  };

  // Clear paperIds
  const handleNewPaper = () => setPaperIds([]);

  return (
    <div className="dark bg-base-200 min-h-screen flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-3xl rounded-2xl bg-base-300/90 shadow-2xl p-8">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {/* Exam */}
          <select
            className="select select-lg select-bordered rounded-xl bg-base-200 text-base-content font-medium text-lg shadow focus:border-primary"
            value={selectedExam}
            onChange={(e) => {
              setSelectedExam(e.target.value);
              setSelectedTopic(""); // Reset topic when exam changes
            }}
          >
            {exams.map((exam) => (
              <option key={exam}>{exam}</option>
            ))}
          </select>

          {/* Subject */}
          <select
            className="select select-lg select-bordered rounded-xl bg-base-200 text-base-content font-medium text-lg shadow"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedTopic(""); // Reset topic when subject changes
            }}
          >
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>

          {/* Topic */}
          <select
            className="select select-lg select-bordered rounded-xl bg-base-200 text-base-content font-medium text-lg shadow h-24"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            className="select select-lg select-bordered rounded-xl bg-base-200 text-base-content font-medium text-lg shadow"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {questionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          {/* Difficulty */}
          <select
            className="select select-lg select-bordered rounded-xl bg-base-200 text-base-content font-medium text-lg shadow"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((diff) => (
              <option key={diff}>{diff}</option>
            ))}
          </select>

          {/* Number of Questions */}
          <input
            type="number"
            min={1}
            max={50}
            className="input input-lg input-bordered rounded-xl w-28 bg-base-200 text-base-content text-center font-semibold text-xl shadow"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            placeholder="5"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={handleNewPaper}
            className="btn btn-lg btn-outline btn-warning font-semibold text-lg rounded-xl shadow hover:scale-105 transition-all duration-150"
          >
            New Paper
          </button>
          <button
            onClick={handleAddToPaper}
            className="btn btn-lg btn-outline btn-success font-semibold text-lg rounded-xl shadow hover:scale-105 transition-all duration-150"
          >
            Add to Paper
          </button>
          <button
            onClick={handleGenerateQuiz}
            className="btn btn-lg btn-primary font-bold text-lg rounded-xl shadow hover:scale-105 hover:bg-primary/90 transition-all duration-150"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        <div className="flex w-full justify-center items-center flex-col py-4 text-xl">
          <p className="font-bold">Ids of the current questions</p>
          <p>{questionIds.length ? questionIds.join(", ") : "No questions yet"}</p>
        </div>
        <div className="divider"></div>
        <div className="flex w-full justify-center items-center flex-col py-4 text-lg">
          <p className="font-bold">Paper Question IDs</p>
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {paperIds.length
              ? paperIds.map((id) => (
                  <span
                    key={id}
                    className="badge badge-lg badge-primary badge-outline text-lg"
                  >
                    {id},
                  </span>
                ))
              : <span>No questions added yet</span>
            }
          </div>
          <div className="mt-4 font-semibold">
            Total Questions in Paper: {paperIds.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Express;
