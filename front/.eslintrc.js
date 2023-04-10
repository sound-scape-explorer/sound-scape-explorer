module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module',
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.vue'],
      },
    },
  },
  overrides: [{
    files: [
      '*.ts',
      '*.js',
    ],
    parser: '@typescript-eslint/parser',
  }],
  ignorePatterns: ['src/lib/**/*.ts'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Rules from @bamdadsabbagh/eslint-config
    'strict': 'off',
    'semi': [
      'error',
      'always',
    ],
    'indent': ['error', 2, {
      'ignoredNodes': ['JSXElement'],
      'SwitchCase': 1,
    }],
    'object-shorthand': ['error', 'never'],
    'init-declarations': 'off',
    'no-undef-init': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', '1tbs'],
    'multiline-comment-style': ['error', 'separate-lines'],
    'dot-notation': 'off',
    'quote-props': ['error', 'consistent'],
    'no-multi-spaces': ['error', {'ignoreEOLComments': true}],
    'no-whitespace-before-property': 'error',
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'no-spaced-func': 'off',
    'func-call-spacing': ['error', 'never'],
    'func-names': 'off',
    'block-spacing': ['error', 'always'],
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': ['error', {'consistent': true}],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'space-in-parens': 'error',
    'no-nested-ternary': 'error',
    'padded-blocks': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'eqeqeq': 'error',
    'quotes': ['error', 'single', {'avoidEscape': true}],
    'no-unused-vars': ['warn', {'argsIgnorePattern': '^(symbol|price|tag|since|limit|params|market|timeframe|api|path|code|currency|response|requestHeaders|requestBody|bidsKey|asksKey)'}],
    'new-parens': 'error',
    'new-cap': ['error'],
    'no-var': 'error',
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false,
    }],
    'no-warning-comments': ['warn', {'terms': ['fixme']}],
    'lines-between-class-members': 'error',
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'import/newline-after-import': ['off', {'count': 1}],
    'prefer-template': 'off',
    'curly': ['error', 'all'],
    'no-plusplus': 'off',
    'no-restricted-properties': 'off',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    'no-return-await': 'off',
    'array-bracket-spacing': 'off',
    'radix': 'off',
    'camelcase': 'off',
    'no-lonely-if': 'off',
    'no-mixed-operators': 'off',
    'no-shadow': 'off',
    'no-useless-concat': 'off',
    'no-continue': 'off',
    'no-else-return': 'off',
    'no-unneeded-ternary': 'off',
    'operator-assignment': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-await-in-loop': 'off',
    'arrow-spacing': ['warn', {'before': true, 'after': true}],
    'arrow-parens': ['error', 'always'],
    'key-spacing': [
      'error',
      {'beforeColon': false, 'afterColon': true},
    ],
    'comma-spacing': [
      'warn',
      {'before': false, 'after': true},
    ],
    'import/prefer-default-export': 'off',
    // typescript
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before': false,
      'after': true,
      'overrides': {
        'arrow': {
          'before': true,
        },
      },
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'multilineDetection': 'brackets',
    }],
    '@typescript-eslint/object-curly-spacing': ['error', 'never'],
  },
};
