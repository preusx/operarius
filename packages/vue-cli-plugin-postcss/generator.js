const { version } = require('./package.json');

const LIBRARY_NAME = 'postcss-config';
const POSTCSS_CONFIG = `@operarius/${LIBRARY_NAME}`;

module.exports = api => {
  api.extendPackage({
    devDependencies: {
      [POSTCSS_CONFIG]: process.env.VUE_CLI_GENERATOR_INTERNAL_MODE
        ? `file:../packages/${LIBRARY_NAME}`
        : `^${version}`,
    },
  });

  api.render('./template');
};
