import { useEffect, useState } from "react";
import {
  getAllPDFNotes,
  deletePDF,
} from "../services/api";

export default function MyNotes({
  setSelectedNoteId,
  setSection,
}) {
  const [notes, setNotes] = useState([]);

  const [expandedSummary, setExpandedSummary] =
    useState(null);

  const fetchNotes = async () => {
    try {
      const res = await getAllPDFNotes();

      setNotes(res.notes || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deletePDF(id);

      setNotes((prev) =>
        prev.filter(
          (note) => note._id !== id
        )
      );

      alert("Note deleted successfully");
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>History 📜</h2>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              background:
                "var(--card-bg)",

              padding: "18px",

              marginBottom: "18px",

              borderRadius: "18px",

              border:
                "1px solid var(--border)",

              boxShadow:
                "var(--shadow)",
            }}
          >
            <h3>{note.originalName}</h3>

            <div
              style={{
                display: "flex",

                gap: "10px",

                marginTop: "14px",

                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  if (
                    setSelectedNoteId
                  ) {
                    setSelectedNoteId(
                      note._id
                    );
                  }

                  if (setSection) {
                    setSection("chat");
                  }
                }}
                style={buttonStyle}
              >
                Open Chat
              </button>

              <button
                onClick={() =>
                  setExpandedSummary(
                    expandedSummary ===
                      note._id
                      ? null
                      : note._id
                  )
                }
                style={buttonStyle}
              >
                View Summary
              </button>

              <button
                onClick={() =>
                  handleDelete(note._id)
                }
                style={{
                  ...buttonStyle,

                  background:
                    "#ef4444",
                }}
              >
                Delete
              </button>
            </div>

            {expandedSummary ===
              note._id && (
              <div
                style={{
                  marginTop: "15px",

                  padding: "14px",

                  background:
                    "var(--bg)",

                  border:
                    "1px solid var(--border)",

                  borderRadius: "12px",
                }}
              >
                <strong>
                  Summary:
                </strong>

                <p
                  style={{
                    whiteSpace:
                      "pre-wrap",

                    marginTop: "10px",

                    lineHeight: "1.7",
                  }}
                >
                  {note.summary}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "10px 16px",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  background: "var(--accent)",

  color: "white",

  fontWeight: "600",

  transition: "0.2s ease",
};