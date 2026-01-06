import vueParser from 'vue-eslint-parser';
import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import deMorgan from 'eslint-plugin-de-morgan';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import {plugins, rules} from '../eslint.config.mjs';

const tsRules = {
  // typescript plugin
  ...tsPlugin.rules.recommended,
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern:
        '^(symbol|price|tag|since|limit|params|market|timeframe|api|path|code|currency|response|requestHeaders|requestBody|bidsKey|asksKey)',
    },
  ],
  // 'no-redeclare': 'off',
  // '@typescript-eslint/no-redeclare': 'error',
};

const vueRules = {
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      registeredComponentsOnly: true,
      ignores: [],
    },
  ],
};

export default [
  js.configs.recommended,
  deMorgan.configs.recommended,
  {
    ignores: ['**/dist/**', '**/common/spectrogram/{fft,index}.js'],
  },
  {
    files: ['**/*.{vue,ts,js}'],
    plugins: {
      ...plugins,
      '@typescript-eslint': tsPlugin,
      'vue': vuePlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        parser: tsParser,
        sourceType: 'module',
      },
    },
    rules: {
      ...rules,
      ...tsRules,
      ...vueRules,
    },
  },
];
