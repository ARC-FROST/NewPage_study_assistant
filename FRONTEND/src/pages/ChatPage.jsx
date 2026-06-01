import ChatBox from "../components/ChatBox";

export default function ChatPage({ noteId }) {
  if (!noteId) {
    return <p>Please upload a PDF first 📄</p>;
  }

  return <ChatBox noteId={noteId} />;
}