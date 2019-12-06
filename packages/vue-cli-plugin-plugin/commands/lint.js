const fs = require('fs');
const path = require('path');
const Service = require('@vue/cli-service'); // eslint-disable-line import/no-unresolved

function service(context, args, command) {
  return new Service(context).run(command, args);
}

const FOLDER_LINT = [
  'src',
  'tests',
  'example',
];
const GLOBS_LINT = [
  // root config files
  '*.js',
  '.*.js',
];

const exists = root => p => fs.existsSync(path.join(root, p));

module.exports = api => ({
  opts: {
    description: 'Same as lint command with different default entries to lint',
    usage: 'vue-cli-service plugin-lint [options] entry',
  },
  fn: async args => {
    const context = api.getCwd();
    args._ = ['plugin-lint'].concat( // eslint-disable-line no-param-reassign
      args._ && args._.length
        ? args._
        : [].concat(FOLDER_LINT.filter(exists(context)), GLOBS_LINT)
    );

    return service(context, args, 'lint');
  },
});
