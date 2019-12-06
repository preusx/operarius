const { devDependencies } = require('./package.json');

const ADDED_ESLINT_CONFIG = 'eslint:recommended';
const LIBRARY_NAME = 'vue-eslint-config';
const ESLINT_CONFIG = `@operarius/${LIBRARY_NAME}`;

module.exports = api => {
  const { eslintConfig } = api.generator.pkg;

  const index = eslintConfig.extends.indexOf(ADDED_ESLINT_CONFIG);
  if (index !== -1) {
    eslintConfig.extends.splice(index, 1);
  }

  eslintConfig.extends.push(
    api.makeJSOnlyValue(`require.resolve('${ESLINT_CONFIG}')`)
  );
  api.extendPackage({
    eslintConfig,
    devDependencies: {
      [ESLINT_CONFIG]: process.env.VUE_CLI_GENERATOR_INTERNAL_MODE
        ? `file:../packages/${LIBRARY_NAME}`
        : devDependencies[ESLINT_CONFIG],
    },
  });
};
