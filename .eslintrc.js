module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-essential", // or "plugin:vue/vue3-recommended"
      "plugin:@typescript-eslint/recommended", // If using TypeScript
      "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier
    ],
    parserOptions: {
      parser: "@typescript-eslint/parser", // If using TypeScript
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "vue/multi-word-component-names": "off", // Nuxt.js allows single-word component names
      "@typescript-eslint/no-unused-vars": "error", // TypeScript-specific rule
      "prettier/prettier": "error", // Show Prettier errors as ESLint errors
    },
  };
  