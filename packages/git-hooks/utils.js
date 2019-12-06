const chalk = require('chalk');
const process = require('process');

function error(...args) {
  const message = args.join('\n');

  console.log([chalk.red.bold('ERROR:'), message].join(' ')); // eslint-disable-line no-console
  process.exit(1);
}

function warn(...args) {
  const message = args.join('\n');

  console.log([chalk.yellow.bold('WARNING:'), message].join(' ')); // eslint-disable-line no-console
}

module.exports = {
  error, warn,
};
