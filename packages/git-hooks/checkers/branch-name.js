const process = require('process');
const { execSync } = require('child_process');
const c = require('chalk');
const utils = require('../utils.js');

const branchSymbolsMatcher = /^[a-z0-9\/-]+$/mg;
const branchFlowMatchers = [
  /^master$/img,
  /^dev$/img,
  /^release\/.+/img,
  /^feature\/.+/img,
  /^hotfix\/.+/img,
  /^fix\/.+/img,
];

function getBranchName() {
  return process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME ||
    (!process.env.CI_COMMIT_TAG && process.env.CI_COMMIT_REF_NAME) ||
    new String(execSync('git rev-parse --abbrev-ref HEAD')).trim(); // eslint-disable-line no-new-wrappers
}

function error(...args) {
  utils.error(
    ...args,
    '',
    `Please change branch name with ${c.bold('git branch -m new_name')}.`,
    'Skip pre-commit hooks with --no-verify (not recommended).'
  );
}

function branchNameSymbolsChecker(branchName) {
  /**
   * Branch names symbols match.
   */

  if (!branchSymbolsMatcher.test(branchName)) {
    error(
      c.red(`Wrong branch name ${c.bold(branchName)}!`),
      'Branch name should contain only lowercased latin symbols',
      'with slash and dash as a delimiters.'
    );
  }
}

function branchNameFlowChecker(branchName) {
  /**
   * Branch names match basic patterns check.
   */

  if (!branchFlowMatchers.some(x => x.test(branchName))) {
    error(
      c.red(`Wrong branch name ${c.bold(branchName)}!`),
      'Branch name could only has names like:',
      ' - master',
      ' - dev',
      'Or prefixed with:',
      ' - release/',
      ' - feature/',
      ' - hotfix/',
      ' - fix/'
    );
  }
}

module.exports = () => {
  const branchName = getBranchName();

  branchNameSymbolsChecker(branchName);
  branchNameFlowChecker(branchName);
};
