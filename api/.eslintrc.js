module.exports = {
  env: {
    mocha: true,
    node: true,
    protractor: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  rules: {
    'max-len': [
      'error',
      {
        code: 160,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'block-spacing': ['error', 'always'],
  },
}
