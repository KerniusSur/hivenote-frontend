export const getBaseUrl = () =>
	process.env.NODE_ENV === "production"
		? "https://hivenote.lol"
		: "http://localhost:4000";
