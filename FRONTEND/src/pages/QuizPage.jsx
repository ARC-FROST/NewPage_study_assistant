import { useEffect, useState } from "react";

import {
  getAllPDFNotes,
  generateQuiz,
  uploadPDF,
} from "../services/api";

export default function QuizPage() {
  const [notes, setNotes] = useState([]);

  const [selectedNoteId, setSelectedNoteId] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [quiz, setQuiz] = useState([]);

  const [answers, setAnswers] = useState({});

  const [score, setScore] = useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getAllPDFNotes();

      setNotes(res.notes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      setLoading(true);

      let noteId = selectedNoteId;

      // Upload new PDF
      if (!noteId && selectedFile) {
        const uploadRes = await uploadPDF(
          selectedFile
        );

        noteId = uploadRes.id;

        await fetchNotes();
      }

      if (!noteId) {
        alert(
          "Please select or upload a PDF"
        );

        setLoading(false);

        return;
      }
      console.log("Generating quiz for:", noteId);
      const res = await generateQuiz(
        noteId
      );

      if (!res.success) {
        alert(
          res.message ||
            "Quiz generation failed"
        );

        setLoading(false);

        return;
      }

      setQuiz(res.quiz || []);

      setAnswers({});

      setScore(null);
    } catch (error) {
      console.log(error);

      alert("Quiz generation failed");
    }

    setLoading(false);
  };

  const handleOptionSelect = (
    questionIndex,
    option
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
  let total = 0;

  quiz.forEach((q, index) => {
    console.log(
      "Selected:",
      answers[index]
    );

    console.log(
      "Correct:",
      q.correctAnswer
    );

    if (
      answers[index]?.trim() ===
      q.correctAnswer?.trim()
    ) {
      total++;
    }
  });

  console.log("Final Score:", total);

  setScore(total);
};

  return (
    <div>
      <h1>Quiz Generator 📝</h1>

      {/* PDF Selection */}
      <div style={styles.card}>
        <h3>Select Existing PDF</h3>

        <select
          value={selectedNoteId}
          onChange={(e) =>
            setSelectedNoteId(
              e.target.value
            )
          }
          style={styles.select}
        >
          <option value="">
            Choose PDF
          </option>

          {notes.map((note) => (
            <option
              key={note._id}
              value={note._id}
            >
              {note.originalName}
            </option>
          ))}
        </select>

        <hr style={styles.divider} />

        <h3>Or Upload New PDF</h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setSelectedFile(
              e.target.files[0]
            )
          }
          style={styles.input}
        />

        <button
          onClick={handleGenerateQuiz}
          disabled={loading}
          style={styles.button}
        >
          {loading
            ? "Generating..."
            : "Generate Quiz"}
        </button>
      </div>

      {/* Quiz Questions */}
      {quiz.length > 0 && (
        <div style={styles.quizCard}>
          <h2>Quiz</h2>

          {quiz.map((q, index) => (
            <div
              key={index}
              style={styles.questionCard}
            >
              <h3>
                Q{index + 1}.{" "}
                {q.question}
              </h3>

              {q.options.map(
                (
                  option,
                  optionIndex
                ) => (
                  <label
                    key={optionIndex}
                    style={styles.option}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={
                        answers[index] ===
                        option
                      }
                      onChange={() =>
                        handleOptionSelect(
                          index,
                          option
                        )
                      }
                    />

                    {" "}
                    {option}
                  </label>
                )
              )}
            </div>
          ))}

          <button
            onClick={handleSubmitQuiz}
            style={styles.submitButton}
          >
            Submit Quiz
          </button>

          {score !== null && (
            <div style={styles.scoreCard}>
              <h2>
                🎉 Your Score: {score} /{" "}
                {quiz.length}
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "var(--card-bg)",

    padding: "22px",

    borderRadius: "20px",

    marginBottom: "24px",

    border:
      "1px solid var(--border)",

    boxShadow: "var(--shadow)",
  },

  select: {
    padding: "12px",

    width: "100%",

    maxWidth: "400px",

    borderRadius: "10px",

    border:
      "1px solid var(--border)",

    background: "var(--card-bg)",

    color: "var(--text)",
  },

  divider: {
    margin: "24px 0",

    border:
      "1px solid var(--border)",
  },

  input: {
    marginTop: "10px",

    marginBottom: "16px",

    background: "var(--card-bg)",

    color: "var(--text)",

    border:
      "1px solid var(--border)",

    padding: "10px",

    borderRadius: "10px",

    width: "100%",
  },

  button: {
    padding: "12px 20px",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    background: "var(--accent)",

    color: "white",

    fontWeight: "600",

    transition: "0.2s ease",
  },

  quizCard: {
    background: "var(--card-bg)",

    padding: "24px",

    borderRadius: "20px",

    border:
      "1px solid var(--border)",

    boxShadow: "var(--shadow)",
  },

  questionCard: {
    marginBottom: "30px",

    padding: "18px",

    borderRadius: "16px",

    background: "var(--bg)",

    border:
      "1px solid var(--border)",
  },

  option: {
    display: "block",

    marginBottom: "12px",

    cursor: "pointer",

    lineHeight: "1.6",
  },

  submitButton: {
    padding: "12px 22px",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    background: "var(--accent)",

    color: "white",

    fontWeight: "700",
  },

  scoreCard: {
    marginTop: "24px",

    padding: "22px",

    background: "var(--bg)",

    borderRadius: "18px",

    border:
      "1px solid var(--border)",

    textAlign: "center",
  },
};