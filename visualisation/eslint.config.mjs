import defaultConfig, {plugins, rules} from '../eslint.config.mjs';

export default [
  ...defaultConfig,
  {
    files: ['**/*.{js,cjs,mjs,ts,jsx,tsx}'],
    plugins,
    rules,
  },
];
