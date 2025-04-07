import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": "http://localhost:5000",
      "/socket.io": "http://localhost:5000",
      "/ws": "http://localhost:5000",
    },
  },
});
