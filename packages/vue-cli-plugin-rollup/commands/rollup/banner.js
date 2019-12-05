module.exports = ({ name, version, year, author, license }) => {
  return '/*!\n' +
    ` * ${name} v${version} \n` +
    (author && ` * (c) ${year} ${author || ''}\n` || '') +
    (license && ` * Released under the ${license} License.\n` || '') +
    ' */';
}
