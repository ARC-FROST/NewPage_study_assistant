import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ChatBox({
  noteId,
}) {
  const [messages, setMessages] = useState(
    []
  );

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const bottomRef = useRef(null);

  // 🔥 LOAD OLD CHATS
  useEffect(() => {
    fetchChats();
  }, [noteId]);

  const fetchChats = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3001/api/chat/${noteId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        const formattedMessages =
          data.chats.flatMap((chat) => [
            {
              role: "user",
              text: chat.question,
            },
            {
              role: "bot",
              text: chat.answer,
            },
          ]);

        setMessages(
          formattedMessages
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    setInput("");

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3001/api/pdf/ask",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: token,
          },

          body: JSON.stringify({
            noteId,
            question: input,
          }),
        }
      );

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.answer,
      };

      setMessages((prev) => [
        ...prev,
        botMsg,
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Error connecting to server.",
        },
      ]);
    }

    setLoading(false);
  };

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div style={styles.container}>
      {/* CHAT AREA */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,

              alignSelf:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.role === "user"
                  ? "#22c55e"
                  : "#e5e7eb",

              color:
                msg.role === "user"
                  ? "white"
                  : "black",
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask anything about your PDF..."
          style={styles.input}
        />

        <button
          onClick={sendMessage}
          style={styles.button}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",

    maxWidth: "700px",

    margin: "auto",

    borderRadius: "20px",

    border: "1px solid var(--border)",

    display: "flex",

    flexDirection: "column",

    height: "75vh",

    background: "var(--card-bg)",

    overflow: "hidden",

    boxShadow: "var(--shadow)",
  },

  chatBox: {
    flex: 1,

    padding: "15px",

    display: "flex",

    flexDirection: "column",

    gap: "10px",

    overflowY: "auto",

    background: "var(--bg)",
  },

  message: {
    padding: "10px 14px",

    borderRadius: "14px",

    maxWidth: "75%",

    fontSize: "14px",

    lineHeight: "1.5",

    boxShadow: "var(--shadow)",
  },

  inputBox: {
    display: "flex",

    borderTop: "1px solid var(--border)",

    padding: "12px",

    background: "var(--card-bg)",
  },

  input: {
    flex: 1,

    padding: "12px",

    borderRadius: "10px",

    border: "1px solid var(--border)",

    outline: "none",

    background: "var(--card-bg)",

    color: "var(--text)",
  },

  button: {
    marginLeft: "10px",

    padding: "12px 18px",

    background: "var(--accent)",

    color: "white",

    border: "none",

    borderRadius: "10px",

    cursor: "pointer",

    fontWeight: "600",

    transition: "0.2s ease",
  },

  typing: {
    fontSize: "12px",

    color: "var(--text)",

    fontStyle: "italic",
  },
};