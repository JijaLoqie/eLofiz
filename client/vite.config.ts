import path from "path";

export default {
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
};
