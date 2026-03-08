import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/deezer": {
        target: "https://api.deezer.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deezer/, ""),
        secure: true,
      },
    },
  },
});
