
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      external: [
        // Mark PatternFly CSS as external to avoid bundling issues
        /^@patternfly\/react-core\/dist\/styles\/.*\.css$/
      ]
    }
  },
  base: './',
  define: {
    'process.env.BASE_URL': JSON.stringify('./'),
    // Define the Cockpit base path for development
    'import.meta.env.VITE_COCKPIT_BASE_PATH': JSON.stringify('')
  }
}));
