import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['.gitpod.io'],
    proxy: {
      "/api": "http://localhost:5000",
      "/socket.io": "http://localhost:5000",
      "/ws": "http://localhost:5000",
    },
  },
});
