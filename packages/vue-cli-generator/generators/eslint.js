const { version } = require('../package.json');
const ADDED_ESLINT_CONFIG = 'eslint:recommended';
const ESLINT_CONFIG = '@operarius/eslint-config';

module.exports = api => {
  const { eslintConfig } = api.generator.pkg;

  const index = eslintConfig.extends.indexOf(ADDED_ESLINT_CONFIG);
  if (index !== -1) {
    eslintConfig.extends.splice(index, 1);
  }

  eslintConfig.extends.push(ESLINT_CONFIG);
  api.extendPackage({
    eslintConfig,
    devDependencies: {
      [ESLINT_CONFIG]: `^${version}`,
    },
  });
}