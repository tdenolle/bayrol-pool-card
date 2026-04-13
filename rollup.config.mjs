import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/bayrol-pool-card.ts",
  output: {
    file: "dist/bayrol-pool-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser({ format: { comments: false } }),
  ],
};
