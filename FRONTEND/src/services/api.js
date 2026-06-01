import axios from "axios";

const API = axios.create({
  baseURL: "https://newpage-backend-0gyx.onrender.com",
});

//  attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

/* PDF  */

export const uploadPDF = async (file) => {
  const formData = new FormData();

  formData.append("pdf", file);

  const res = await API.post(
    "/api/pdf/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const getAllPDFNotes =
  async () => {
    const res = await API.get(
      "/api/pdf/all"
    );

    return res.data;
  };

export const askPDFQuestion =
  async (noteId, question) => {
    const res = await API.post(
      "/api/pdf/ask",
      {
        noteId,
        question,
      }
    );

    return res.data;
  };

export const deletePDF = async (id) => {
  const res = await API.delete(
    `/api/pdf/${id}`
  );

  return res.data;
};

/* ---------------- QUIZ ---------------- */

export const generateQuiz =
  async (noteId) => {
    const res = await API.post(
      "/api/quiz/generate",
      {
        noteId,
      }
    );

    return res.data;
  };

export default API;