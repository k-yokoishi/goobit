module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
  },
  globals: {
    element: true,
    by: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          './e2e/init.js',
          './storybook/index.js',
          './storybook/stories/index.js',
        ],
      },
    ],
  },
};
