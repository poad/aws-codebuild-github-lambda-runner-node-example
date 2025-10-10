import { defineConfig } from 'eslint/config';
import { configs, parser } from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import solid from 'eslint-plugin-solid';
import importPlugin from 'eslint-plugin-import';

export default defineConfig(
  {
    ignores: [
      'dist',
      'bun.lock',
    ]
  },
  ...configs.strict,
  ...configs.stylistic,
  eslintConfigPrettier,
  {
    files: ['src/**/*.{ts,tsx}'],
    ...solid,
    plugins: {
      import: importPlugin,
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      parser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
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
    rules: {
      'react/display-name': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
);
