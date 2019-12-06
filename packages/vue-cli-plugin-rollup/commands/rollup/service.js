const { getConfig } = require('../../config/rollup');
const bundle = require('./bundle');
const banner = require('./banner');

module.exports = (pkg, inOut) => {
  const {
    name, version, author, license,
  } = pkg;
  const entries = getConfig(
    { name, version },
    inOut,
    banner({
      name,
      version,
      author,
      year: new Date().getFullYear(),
      license,
    })
  );

  return bundle(entries);
};
