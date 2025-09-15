import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },
  prettier,
];
