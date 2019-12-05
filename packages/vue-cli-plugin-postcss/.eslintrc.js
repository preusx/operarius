module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    '@operarius/eslint-config'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['template/**/*'],
      rules: {
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
