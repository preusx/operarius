module.exports = ({
  name, version, year, author, license,
}) => '/*!\n'
    + ` * ${name} v${version} \n`
    + ` * (c) ${year} ${author}\n`
    + ` * Released under the ${license} License.\n`
    + ' */';
