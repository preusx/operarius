const branchNameChecker = require('../checkers/branch-name');

module.exports = args => {
  branchNameChecker(args);
};
