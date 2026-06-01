import { useState } from "react";
import API from "../services/api";

function StudyForm() {
  const [subject, setSubject] = useState("");
  const [hoursAvailable, setHoursAvailable] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await API.post("/api/studyplans/generate", {
      subject,
      hoursAvailable,
      goal,
    });

    setResult(response.data);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject</label>
          <br />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Hours Available</label>
          <br />
          <input
            type="number"
            value={hoursAvailable}
            onChange={(e) => setHoursAvailable(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Goal</label>
          <br />
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
  {loading ? "Generating..." : "Generate Study Plan"}
</button>
      </form>

      {result && (
  <div>
    <h3>Generated Study Plan</h3>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}
    >
      {result.generatedPlan}
    </pre>
  </div>
)}
    </>
  );
}

export default StudyForm;