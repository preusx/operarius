const config = require('@operarius/postcss-config'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = Object.assign({}, config, { // eslint-disable-line prefer-object-spread
  plugins: [].concat(config.plugins, [

  ]),
});
