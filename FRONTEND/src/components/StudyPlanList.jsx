import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function StudyPlanList() {
  const [plans, setPlans] = useState([]);

  const [expandedPlan, setExpandedPlan] =
    useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await API.get(
        "/api/studyplans"
      );

      setPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this study plan?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/api/studyplans/${id}`
      );

      setPlans((prev) =>
        prev.filter(
          (plan) => plan._id !== id
        )
      );

      if (expandedPlan === id) {
        setExpandedPlan(null);
      }
    } catch (error) {
      console.error(error);

      alert("Delete failed");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Previous Study Plans</h2>

      {plans.length === 0 ? (
        <p>No study plans found.</p>
      ) : (
        <div style={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan._id}
              style={styles.card}
            >
              <h3>{plan.subject}</h3>

              <p>
                🎯 Goal: {plan.goal}
              </p>

              <p>
                ⏰ Hours:{" "}
                {plan.hoursAvailable}
              </p>

              <div
                style={
                  styles.buttonGroup
                }
              >
                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    setExpandedPlan(
                      expandedPlan ===
                        plan._id
                        ? null
                        : plan._id
                    )
                  }
                >
                  {expandedPlan ===
                  plan._id
                    ? "Hide Plan"
                    : "View Plan"}
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    handleDelete(
                      plan._id
                    )
                  }
                >
                  Delete
                </button>
              </div>

              {expandedPlan ===
                plan._id && (
                <div
                  style={
                    styles.planContent
                  }
                >
                  <p
                    style={{
                      whiteSpace:
                        "pre-wrap",
                    }}
                  >
                    {
                      plan.generatedPlan
                    }
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",

    gap: "20px",

    marginTop: "20px",
  },

  card: {
    background: "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "18px",

    padding: "20px",

    boxShadow: "var(--shadow)",

    transition: "0.2s ease",
  },

  buttonGroup: {
    display: "flex",

    gap: "10px",

    marginTop: "15px",
  },

  viewBtn: {
    flex: 1,

    padding: "10px 16px",

    border: "none",

    borderRadius: "10px",

    background: "var(--accent)",

    color: "white",

    cursor: "pointer",

    fontWeight: "600",
  },

  deleteBtn: {
    padding: "10px 16px",

    border: "none",

    borderRadius: "10px",

    background: "#ef4444",

    color: "white",

    cursor: "pointer",

    fontWeight: "600",
  },

  planContent: {
    marginTop: "18px",

    padding: "15px",

    background: "var(--bg)",

    borderRadius: "12px",

    border:
      "1px solid var(--border)",

    lineHeight: "1.7",

    maxHeight: "300px",

    overflowY: "auto",
  },
};

export default StudyPlanList;