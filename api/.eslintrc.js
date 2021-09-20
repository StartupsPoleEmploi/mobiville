module.exports = {
  env: {
    mocha: true,
    node: true,
    protractor: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'space-infix-ops': ['error', { int32Hint: false }],
    'block-spacing': ['error', 'always'],
  },
}
