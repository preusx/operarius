const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const process = require('process');
const utils = require('../utils.js');

module.exports = () => {
  const file = path.resolve(process.env.PWD, process.env.HUSKY_GIT_PARAMS);
  const lines = fs.readFileSync(file).toString('utf-8').split('\n');

  if (lines[0].length > 72) {
    utils.error(
      chalk.red.bold('Commit message subject is too long!'),
      'Please keep message first line under 72 characters long.'
    );
  }

  if (lines[0][0] === lines[0][0].toLowerCase()) {
    utils.error(
      chalk.red.bold('Commit message subject first letter should be uppercase!'),
      'Please ensure the first word is capitalized.'
    );
  }

  if (lines[0].trim().endsWith('.')) {
    utils.error(
      chalk.red.bold('Do not end commit message subject with a period!'),
      'Please remove period from the commit message subject.'
    );
  }

  if (lines.join('').match(/[а-яёґіїъ]+/img)) {
    utils.error(
      chalk.red.bold('Do not use cyrillic symbols in commits!')
    );
  }

  if (lines.length > 2) {
    if (lines[1].replace(/\s/g, '').length) {
      utils.error(
        chalk.red.bold('Second line of the commit message should be empty!'),
        'Please ensure the second line is empty.'
      );
    }
  }
};
