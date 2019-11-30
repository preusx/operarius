const package = require('../../package.json');
const version = `v${package.version}`;

module.exports = ({ internal } = {}) => ({
  useConfigFiles: true,
  plugins: {
    '@vue/cli-plugin-babel': {},
    '@vue/cli-plugin-eslint': {
      config: 'base',
      lintOn: ['save', 'commit']
    },
    '@operarius/vue-cli-plugin-eslint': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-eslint'
        : version,
    },
    '@vue/cli-plugin-unit-mocha': {}
  },
  router: true,
  routerHistoryMode: true,
  cssPreprocessor: 'dart-sass'
});
