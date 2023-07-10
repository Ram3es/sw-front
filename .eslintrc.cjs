module.exports = {
  "env": {
    "browser": true
  },
  "ignorePatterns": [".eslintrc.js"],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  "extends": ["plugin:react/recommended", "standard-with-typescript"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": ["./tsconfig.json"]
  },
  "plugins": ["react", "import"],
  "rules": {
    "semi": 1,
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/accessible-emoji": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "@typescript-eslint/strict-boolean-expressions": 0,
    "import/extensions": ["error", { "ts": "never", "tsx": "never" }]
  }
}
