import { useState } from "react";
import { uploadPDF } from "../services/api";

export default function PDFUpload({
  setSelectedNoteId,
  setPage,
}) {
  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
    useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const res = await uploadPDF(file);

      setSummary(res.summary);

      setSelectedNoteId(res.id);

      if (setPage) {
  setPage("chat");
}
    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <h3>Upload PDF 📄</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        style={styles.input}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={styles.button}
      >
        {loading
          ? "Processing..."
          : "Upload & Ask AI"}
      </button>

      {summary && (
        <div style={styles.summary}>
          <h4>Summary</h4>

          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",

    border:
      "1px solid var(--border)",

    borderRadius: "18px",

    background: "var(--card-bg)",

    marginBottom: "20px",

    boxShadow: "var(--shadow)",
  },

  input: {
    marginTop: "10px",

    marginBottom: "15px",

    background: "var(--card-bg)",

    color: "var(--text)",

    border:
      "1px solid var(--border)",

    padding: "10px",

    borderRadius: "10px",

    width: "100%",
  },

  button: {
    marginTop: "10px",

    padding: "12px 18px",

    background: "var(--accent)",

    color: "white",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    fontWeight: "600",

    transition: "0.2s ease",
  },

  summary: {
    marginTop: "18px",

    background: "var(--bg)",

    padding: "15px",

    borderRadius: "12px",

    border:
      "1px solid var(--border)",

    lineHeight: "1.7",
  },
};