import { useState } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudyForm from "./components/StudyForm";
import StudyPlanList from "./components/StudyPlanList";
import PDFUpload from "./components/PDFUpload";
import MyNotes from "./components/MyNotes";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizPage from "./pages/QuizPage";

function Dashboard() {
  const [selectedNoteId, setSelectedNoteId] =
    useState(null);

  const [section, setSection] =
    useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>
          📚 NewPage
        </h2>

        <button
          style={styles.sidebarBtn}
          onClick={() =>
            setSection("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          style={styles.sidebarBtn}
          onClick={() =>
            setSection("planner")
          }
        >
          Study Planner
        </button>

        <button
          style={styles.sidebarBtn}
          onClick={() =>
            setSection("chat")
          }
        >
          PDF Chat
        </button>

        <button
          style={styles.sidebarBtn}
          onClick={() =>
            setSection("quiz")
          }
        >
          Quiz Generator
        </button>

        <button
          style={styles.sidebarBtn}
          onClick={() =>
            setSection("history")
          }
        >
          History
        </button>

        <button
          style={{
            ...styles.sidebarBtn,

            background: "#ef4444",

            color: "white",
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {section === "dashboard" && (
          <>
            <h1>
              Welcome to NewPage 
            </h1>

            <p
              style={{
                marginBottom: "30px",
              }}
            >
              Upload PDFs, chat with AI,
              generate quizzes, and plan
              your studies smarter.
            </p>

            <div style={styles.cardGrid}>
  <div
    style={styles.card}
    onClick={() =>
      setSection("chat")
    }
  >
    📄 PDF Notes
  </div>

  <div
    style={styles.card}
    onClick={() =>
      setSection("chat")
    }
  >
    🤖 AI Chat
  </div>

  <div
    style={styles.card}
    onClick={() =>
      setSection("quiz")
    }
  >
    📝 Quizzes
  </div>

  <div
    style={styles.card}
    onClick={() =>
      setSection("planner")
    }
  >
    📚 Study Planner
  </div>

  <div
    style={styles.card}
    onClick={() =>
      setSection("history")
    }
  >
    📜 History
  </div>
</div>
          </>
        )}

        {section === "planner" && (
          <>
            <h1>Study Planner</h1>

            <StudyForm />

            <StudyPlanList />
          </>
        )}

        {section === "chat" && (
          <>
            <h1>PDF Chat</h1>

            <PDFUpload
              setSelectedNoteId={
                setSelectedNoteId
              }
            />

            <ChatPage
              noteId={selectedNoteId}
            />
          </>
        )}

        {section === "quiz" && (
          <QuizPage
            noteId={selectedNoteId}
          />
        )}

        {section === "history" && (
          <>
            <h1>History</h1>

            <MyNotes
              setSelectedNoteId={
                setSelectedNoteId
              }
              setSection={setSection}
            />
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",

    minHeight: "100vh",

    background: "var(--bg)",

    color: "var(--text)",
  },

  sidebar: {
    width: "250px",

    background: "var(--card-bg)",

    borderRight:
      "1px solid var(--border)",

    padding: "24px 18px",

    display: "flex",

    flexDirection: "column",

    gap: "12px",

    boxShadow: "var(--shadow)",
  },

  logo: {
    marginBottom: "20px",
  },

  sidebarBtn: {
    width: "100%",

    padding: "14px",

    border: "none",

    borderRadius: "14px",

    cursor: "pointer",

    background:
      "rgba(34, 197, 94, 0.12)",

    color: "var(--accent)",

    fontWeight: "600",

    fontSize: "15px",

    transition: "0.2s ease",

    textAlign: "left",
  },

  content: {
    flex: 1,

    padding: "35px",

    overflowY: "auto",
  },

  cardGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",

    gap: "20px",
  },

  card: {
  background: "var(--card-bg)",

  padding: "24px",

  borderRadius: "20px",

  border:
    "1px solid var(--border)",

  boxShadow: "var(--shadow)",

  fontSize: "18px",

  fontWeight: "600",

  minHeight: "120px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  cursor: "pointer",

  transition: "0.2s ease",

  userSelect: "none",
},
};

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* PROTECTED APP */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* DEFAULT */}
      <Route
        path="*"
        element={
          <Navigate to="/app" />
        }
      />
    </Routes>
  );
}