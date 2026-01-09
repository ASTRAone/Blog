import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://blog-phi-weld-32.vercel.app",
});
