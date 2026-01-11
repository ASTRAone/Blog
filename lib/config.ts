export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://blog-phi-weld-32.vercel.app"
    : "http://localhost:3000";

export const config = {
  API_URL,
} as const;
