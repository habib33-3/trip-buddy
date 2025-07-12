/* eslint-disable unicorn/prefer-module */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/config": path.resolve(__dirname, "src/config"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/validations": path.resolve(__dirname, "src/validations"),
      "@/providers": path.resolve(__dirname, "src/providers"),
      "@/router": path.resolve(__dirname, "src/router"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/ui": path.resolve(__dirname, "src/components/ui"),
      "@/buttons": path.resolve(__dirname, "src/components/buttons"),
      "@/form": path.resolve(__dirname, "src/components/form"),
      "@/shared": path.resolve(__dirname, "src/components/shared"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/store": path.resolve(__dirname, "src/store"),
      "@/api": path.resolve(__dirname, "src/api"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "dist/stats.html", // output file
          open: true, // open report automatically after build
          gzipSize: true, // show gzip size
          brotliSize: true, // show brotli size
        }),
      ],
    },
  },
});
