/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  env: {
    node: true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  rules: {
    "vue/multi-word-component-names": "off"
  },
  "parserOptions": {
    "ecmaVersion": "latest"
  }
};