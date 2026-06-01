export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <button onClick={() => setPage("chat")}>Chat</button>
      <button onClick={() => setPage("notes")}>Notes</button>
      <button onClick={() => setPage("planner")}>Planner</button>
      <button onClick={() => setPage("quiz")}>Quiz</button>
      <button onClick={() => setPage("history")}>History</button>
    </div>
  );
}