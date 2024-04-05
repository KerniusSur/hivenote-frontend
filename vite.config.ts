import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      },
    },
    port: 4000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      api: path.resolve(__dirname, "./src/api"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
      assets: path.resolve(__dirname, "./src/assets"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      models: path.resolve(__dirname, "./src/models"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      AppTheme: path.resolve(__dirname, "./src/AppTheme.tsx"),
    },
  },
  build: {
    outDir: "dist",
  },
  base: "./",
  plugins: [react()],
});
