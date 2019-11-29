module.exports = {
  extends: [
    require.resolve('@operarius/vue-eslint-config'),
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
};
