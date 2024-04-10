export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://hivenote.lol"
    : "http://localhost:4000";

// export const getSocketBaseUrl = (noteId) =>
//   (process.env.NODE_ENV === "production"
//     ? "hivenote.lol"
//     : "192.168.0.173:9092") +
//   "?room=" +
//   noteId;
export const getSocketBaseUrl = () =>
  process.env.NODE_ENV === "production" ? "hivenote.lol" : "localhost:9092";
// process.env.NODE_ENV === "production" ? "hivenote.lol" : "192.168.64.1:9092";
// process.env.NODE_ENV === "production" ? "hivenote.lol" : "127.0.0.1:9092";
// process.env.NODE_ENV === "production" ? "hivenote.lol" : "192.168.0.173:9092";
