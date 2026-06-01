import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

 const handleSignup = async () => {
    console.log("Signup button clicked");
  const res = await fetch("http://localhost:3001/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Signup failed");
    return;
  }

  alert("Signup successful");
  navigate("/login");
};
  return (
    <div style={styles.container}>
      <h1> NewPage </h1>
      <p>Create your account </p>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={styles.input}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={styles.input}
      />

      <button onClick={handleSignup} style={styles.button}>
        Signup
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 300, margin: "auto" },
  input: { display: "block", margin: "10px 0", padding: 10, width: "100%" },
  button: { padding: 10, width: "100%" },
};