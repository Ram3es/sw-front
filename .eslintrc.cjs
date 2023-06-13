module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: ['.eslintrc.js'],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    'semi': 'always',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "@typescript-eslint/strict-boolean-expressions": 0,
    "import/extensions": [
      "error",
      {
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
}
