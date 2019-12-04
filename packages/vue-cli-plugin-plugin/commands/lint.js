const Service = require('@vue/cli-service'); // eslint-disable-line import/no-unresolved

function service(context, args, command) {
  return new Service(context).run(command, args);
}

const defaultFilesToLint = [
  'src',
  'tests',
  'example',
  // root config files
  '*.js',
  '.*.js',
];

module.exports = api => ({
  opts: {
    description: 'Same as lint command with different default entries to lint',
    usage: 'vue-cli-service plugin-lint [options] entry',
  },
  fn: async args => {
    const context = api.getCwd();
    args._ = args._ && args._.length // eslint-disable-line no-param-reassign
      ? args._
      : defaultFilesToLint;

    return service(context, args, 'lint');
  },
});
