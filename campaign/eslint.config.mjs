import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import defaultConfig, {plugins, rules} from '../eslint.config.mjs';

const reactPlugins = {
  'react': reactPlugin,
  'react-hooks': reactHooksPlugin,
  'react-refresh': reactRefreshPlugin,
};

const reactRules = {
  ...reactPlugin.configs.recommended.rules,
  ...reactHooksPlugin.configs.recommended.rules,
  'react/react-in-jsx-scope': 'off',
  'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
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
};

export default [
  ...defaultConfig,
  {
    files: ['**/*.{js,cjs,mjs,ts,jsx,tsx}'],
    plugins: {
      ...plugins,
      ...reactPlugins,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...rules,
      ...reactRules,
    },
  },
];
