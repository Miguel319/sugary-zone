const baseUrl =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:3001/api";

export default baseUrl;
