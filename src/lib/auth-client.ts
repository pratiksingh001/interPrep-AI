import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
   baseURL: process.env.NODE_ENV === "production" 
      ? "https://inter-prep-ai-ruddy.vercel.app"
      : "http://localhost:3000",
});
