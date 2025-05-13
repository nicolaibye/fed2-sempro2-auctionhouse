import { defineConfig } from "vite";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    manifest: true,
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext",
    assetsInlineLimit: 10000000,
    rollupOptions: {
      input: {
        main: "/index.html",
        login: "/login/index.html",
        register: "/register/index.html",
        profile: "/profile/index.html",
        auctions: "/auctions/index.html",
        item: "/auctions/item/index.html",
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
