/* eslint-disable unicorn/prefer-module */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          brotliSize: true, // show brotli size
          filename: "dist/stats.html", // output file
          gzipSize: true, // show gzip size
          open: true, // open report automatically after build
        }),
      ],
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/api": path.resolve(__dirname, "src/api"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/buttons": path.resolve(__dirname, "src/components/buttons"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/config": path.resolve(__dirname, "src/config"),
      "@/constants": path.resolve(__dirname, "src/constants"),
      "@/form": path.resolve(__dirname, "src/components/form"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/providers": path.resolve(__dirname, "src/providers"),
      "@/router": path.resolve(__dirname, "src/router"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/shared": path.resolve(__dirname, "src/components/shared"),
      "@/stores": path.resolve(__dirname, "src/stores"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/ui": path.resolve(__dirname, "src/components/ui"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/validations": path.resolve(__dirname, "src/validations"),
    },
  },
});
