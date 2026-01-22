import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL;

  return {
    plugins: [react()],
    server: apiBaseUrl
      ? {
          proxy: {
            "/auth": {
              target: apiBaseUrl,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
  };
});
