const { version } = require('./package.json');

const ADDED_ESLINT_CONFIG = 'eslint:recommended';
const LIBRARY_NAME = 'vue-eslint-config';
const ESLINT_CONFIG = `@operarius/${LIBRARY_NAME}`;

function makeJSOnlyValue(str) {
  const fn = () => {};
  fn.__expression = str; // eslint-disable-line no-underscore-dangle
  return fn;
}

module.exports = api => {
  const { eslintConfig } = api.generator.pkg;

  const index = eslintConfig.extends.indexOf(ADDED_ESLINT_CONFIG);
  if (index !== -1) {
    eslintConfig.extends.splice(index, 1);
  }

  eslintConfig.extends.push(
    makeJSOnlyValue(`require.resolve('${ESLINT_CONFIG}')`),
  );
  api.extendPackage({
    eslintConfig,
    devDependencies: {
      [ESLINT_CONFIG]: process.env.VUE_CLI_GENERATOR_INTERNAL_MODE
        ? `file:../packages/${LIBRARY_NAME}`
        : `^${version}`,
    },
  });
};
