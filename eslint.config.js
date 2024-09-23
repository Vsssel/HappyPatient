import globals from "globals";
import eslintPluginVue from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  eslintPluginVue.configs["vue3-recommended"], // or "flat/essential"
  tsPlugin.configs.recommended,
  prettier,
];
