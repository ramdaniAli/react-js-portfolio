import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
// VitePWA(manifestForPlugin)
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Enable chunk splitting for cache optimization.
        // contenthash is used to efficiently cache assets
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
    // By default, Vite minifies the build. You can customize the minify option here.
    minify: "terser", // use 'esbuild' for faster builds but less optimal results
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    // Control the size limit for inline assets
    assetsInlineLimit: 4096, // 4kb, which is Vite's default value
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      bundles: "/src/bundles",
      components: "/src/components",
      context: "/src/context",
      layouts: "/src/layouts",
      routes: "/src/routes",
      theme: "/src/theme",
      config: "/src/config",
    },
  },
});
