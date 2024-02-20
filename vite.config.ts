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
			},
		},
	},
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@assets": path.resolve(__dirname, "./src/assets"),
		},
	},
	build: {
		outDir: "dist",
	},
	base: "./",
	plugins: [react()],
});
