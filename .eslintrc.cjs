module.exports = {
  root: true,
  env: { browser: true, es2024: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.mjs', 'postcss.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
  ],
  "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-console": "warn",
        "curly": "error",
    },
  settings: { react: { version: 'detect' } },
}
