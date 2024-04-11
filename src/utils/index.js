export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://hivenote.xyz"
    : "http://localhost:4000";

export const getSocketBaseUrl = () =>
  process.env.NODE_ENV === "production" ? "hivenote.xyz" : "localhost:9092";
