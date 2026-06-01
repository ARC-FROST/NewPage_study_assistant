import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
  localStorage.setItem("token", data.token);

  alert("Login successful!");
  navigate("/app");
}
 else {
      alert(data.message);
    }
  };

  return (
  <div style={styles.container}>
    <h1
      style={{
        marginBottom: "10px",
      }}
    >
      📚 NewPage
    </h1>

    <h2>Welcome</h2>

    <input
      placeholder="Email"
      onChange={(e) =>
        setForm({
          ...form,
          email: e.target.value,
        })
      }
      style={styles.input}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({
          ...form,
          password: e.target.value,
        })
      }
      style={styles.input}
    />

    <button
      onClick={handleLogin}
      style={styles.button}
    >
      Login
    </button>

    <p style={{ marginTop: "15px" }}>
      create a new account?{" "}
      <span
        style={{
          color: "#22c55e",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={() =>
          navigate("/signup")
        }
      >
        Sign up
      </span>
    </p>
  </div>
);
}

const styles = {
  container: { padding: 20, maxWidth: 300, margin: "auto" },
  input: { display: "block", margin: "10px 0", padding: 10, width: "100%" },
  button: { padding: 10, width: "100%" },
};