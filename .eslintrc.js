
module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "overrides": [
    {
      "env": {
        "jest": true,
      },
      "files": [
        "**/*.spec.js",
      ],
    },
    {
      "extends": [
        "plugin:@typescript-eslint/recommended",
      ],
      "files": [
        '**/*.ts'
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.eslint.json",
        "sourceType": "module"
      },
      "plugins": [
        "@typescript-eslint"
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any":0,
        "@typescript-eslint/no-non-null-assertion":2,
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
      "eslint-plugin-prefer-arrow",
  ],
  "rules": {}
};
