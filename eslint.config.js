// @ts-check

import eslintConfigPrettier from 'eslint-config-prettier';
import solid from 'eslint-plugin-solid';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: [
      'dist'
    ]
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
      solid,
    },
    extends: [
      ...tseslint.configs.recommended,
      ...compat.config(importPlugin.configs.recommended),
      ...compat.config(importPlugin.configs.typescript),
    ],
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    rules: {
      semi: ["error", "always"],
    },
  },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'react/display-name': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
);
