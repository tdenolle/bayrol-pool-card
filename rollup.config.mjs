import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default {
  input: "src/bayrol-pool-card.ts",
  output: {
    file: "dist/bayrol-pool-card.js",
    format: "es",
    sourcemap: false,
    banner: `/* bayrol-pool-card v${pkg.version} */`,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        "__VERSION__": JSON.stringify(pkg.version),
      },
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser({ format: { comments: /^!|bayrol-pool-card/ } }),
  ],
};
