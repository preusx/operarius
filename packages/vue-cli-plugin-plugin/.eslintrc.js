module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    '@operarius/eslint-config',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['template/**/*'],
      rules: {
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
