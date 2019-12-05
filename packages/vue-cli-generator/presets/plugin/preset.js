const info = require('../../package.json');

const version = `v${info.version}`;

module.exports = ({ internal } = {}) => ({
  useConfigFiles: true,
  plugins: {
    '@vue/cli-plugin-babel': {},
    '@vue/cli-plugin-eslint': {
      config: 'base',
      lintOn: ['save', 'commit'],
    },
    '@operarius/vue-cli-plugin-eslint': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-eslint'
        : version,
    },
    '@vue/cli-plugin-unit-jest': {},
    '@operarius/vue-cli-plugin-plugin': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-plugin'
        : version,
    },
    '@operarius/vue-cli-plugin-rollup': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-rollup'
        : version,
    },
    '@operarius/vue-cli-plugin-postcss': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-postcss'
        : version,
    },
  },
  cssPreprocessor: 'dart-sass',
});
