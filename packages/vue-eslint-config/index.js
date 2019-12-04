const webpackConfig = require.resolve('@vue/cli-service/webpack.config.js');

module.exports = {
  extends: [
    require.resolve('@operarius/eslint-config'),
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfig,
      },
    },
  },
};
