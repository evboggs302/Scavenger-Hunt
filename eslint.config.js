import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginStorybook from "eslint-plugin-storybook";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    // GLOBAL PROJECT CONFIG
    ignores: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/build/**/*",
      "**/generated/**/*",
      "client/storybook-static/**/*",
      "server/server_rest.ts",
    ],
  },
  {
    // CLIENT LINTING
    ...pluginReact.configs.flat?.recommended,
    files: ["client/**/*.{js,ts,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      ...pluginReactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    ignores: [
      "client/storybook-static/**/*",
      "client/.swc/**/*",
      "client/.deadfiles/**/*",
      "client/stats.html",
      "client/**/*.stories.{ts,tsx}",
    ],
  },
  {
    // CLIENT STORYBOOK LINTING
    files: ["client/**/*.stories.{ts,tsx}"],
    plugins: {
      ...pluginStorybook,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // SERVER LINTING
    files: ["server/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
];
