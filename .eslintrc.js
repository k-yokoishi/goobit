module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
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
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
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
