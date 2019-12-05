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
  rules: {
    'global-require': 'off'
  }
};
