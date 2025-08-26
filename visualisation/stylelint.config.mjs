/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
      rules: {
        // --- CASING ---
        // selectors:
        // .classes: 'selector-class-pattern'
        // properties: 'custom-property-pattern'

        // regex
        // lowerCamelCase: '^[a-z][a-zA-Z0-9]+$'
        // kebab-case: '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$'
        // snake_case: '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$'
        // UpperCamelCase: '^[A-Z][a-zA-Z0-9]+$'

        'custom-property-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        'scss/dollar-variable-pattern': '^[a-z]([a-zA-Z0-9]?)+$',
        'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9]+$',

        // --- CONTRACTING ---
        'declaration-block-no-redundant-longhand-properties': false,
      },
    },
  ],
};
