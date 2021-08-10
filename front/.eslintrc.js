module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    semi: [2, 'never'],
    'import/prefer-default-export': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'react/jsx-props-no-spreading': ['off'],
    'react/forbid-prop-types': [0],
    'react/jsx-one-expression-per-line': 0,
    "comma-dangle": 0
  }
}
