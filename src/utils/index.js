export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://hivenote.lol"
    : "http://localhost:4000";

export const getSocketBaseUrl = (noteId) =>
  (process.env.NODE_ENV === "production"
    ? "hivenote.lol"
    : "192.168.0.173:9092") +
  "?room=" +
  noteId;
