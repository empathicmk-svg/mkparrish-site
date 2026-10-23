import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "**/.next/**",
    ".vercel/**",
    "**/.vercel/**",
    "out/**",
    "**/out/**",
    "build/**",
    "**/build/**",
    "next-env.d.ts",
  ]),
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
