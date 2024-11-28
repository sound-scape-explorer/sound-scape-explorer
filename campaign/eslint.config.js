import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import deMorgan from 'eslint-plugin-de-morgan';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tse from 'typescript-eslint';

export default tse.config(
  {ignores: ['dist']},
  {
    extends: [
      js.configs.recommended,
      tse.configs.strict,
      tse.configs.stylistic,
      importPlugin.flatConfigs.recommended,
      deMorgan.configs.recommended,
    ],
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // globals
      'semi': 'error',
      'quote-props': ['error', 'consistent'],
      'quotes': ['error', 'single', {avoidEscape: true}],
      'import/newline-after-import': ['off', {count: 1}],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-unresolved': 'error',
      'import/no-named-as-default-member': 'off',
      'space-before-blocks': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      // simple-import-sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // typescript
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      // react
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'allow',
        },
      ],
    },
  },
);
