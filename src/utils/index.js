export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://hivenote.xyz"
    : process.env.NODE_ENV === "opennebula"
      ? "http://193.219.91.104:5225"
      : "http://localhost:4000";

export const getSocketBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? "hivenote.xyz"
    : process.env.NODE_ENV === "opennebula"
      ? "http://193.219.91.104:5225"
      : "localhost:9092";
