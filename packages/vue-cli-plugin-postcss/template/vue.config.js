const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        config: {
          // Fixed postcss configuration location inside monorepos
          path: path.join(__dirname, 'postcss.config.js'),
        },
      },
    },
  },
};
