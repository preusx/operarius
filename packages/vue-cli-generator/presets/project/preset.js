const { devDependencies } = require('./package.json');

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
        : devDependencies['@operarius/vue-cli-plugin-eslint'],
    },
    '@vue/cli-plugin-unit-jest': {},
    '@operarius/vue-cli-plugin-postcss': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-postcss'
        : devDependencies['@operarius/vue-cli-plugin-postcss'],
    },
    '@operarius/vue-cli-plugin-git-hooks': {
      version: internal
        ? 'file:../packages/vue-cli-plugin-git-hooks'
        : devDependencies['@operarius/vue-cli-plugin-git-hooks'],
    },
  },
  router: true,
  routerHistoryMode: true,
  cssPreprocessor: 'dart-sass',
});
