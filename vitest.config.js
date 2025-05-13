import { defineConfig } from "vite";

export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/test/e2e/**"],
    environment: "jsdom",
  },
});
