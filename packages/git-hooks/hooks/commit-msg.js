const commitMessageChecker = require('../checkers/commit-message');

module.exports = args => {
  commitMessageChecker(args);
};
