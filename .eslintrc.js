module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
  globals: {
    element: true,
    by: true,
  },
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js', './e2e/init.js'] },
    ],
  },
};
