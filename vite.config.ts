import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
  base: ".",
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
      config: path.resolve(__dirname, "./src/config"),
      types: path.resolve(__dirname, "./src/types"),
      AppTheme: path.resolve(__dirname, "./src/AppTheme.tsx"),
    },
  },
  build: {
    outDir: "dist",
  },
  plugins: [react()],
  logLevel: "info",
});
