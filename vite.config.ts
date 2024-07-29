import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const HTTP_API_URL = env?.VITE_ORIGINAL_HTTP_API_URL;

  return {
    server: {
      port: 4200,
      host: true,
      proxy: {
        "/api": {
          target: HTTP_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react()],
  };
});
