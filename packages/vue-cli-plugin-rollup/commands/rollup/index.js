const path = require('path');
const { existsSync, mkdirSync } = require('fs');
const service = require('./service');

module.exports = api => ({
  opts: {
    description: 'Build for production with rollup',
    usage: 'vue-cli-service rollup [options] [entry file]',
    options: {
      '--dest [path]': 'Specify path for the build destination: `dist` by default',
      '--name [string]': 'Specify name for the build library: by default it\'s a package name',
    },
  },
  fn: async args => {
    const {
      name: packageName, license, version, author,
    } = require(api.resolve('package.json')); // eslint-disable-line global-require

    const entry = args._ && args._.length && args._[0] || 'src/main.js';
    const dest = args.dest || 'dist';
    const name = args.name || packageName;
    const source = api.getCwd();

    if (!existsSync(dest)) {
      mkdirSync(dest);
    }

    return service(
      {
        name, version, author, license,
      },
      { entry, source, dest: path.join(source, dest) },
      args
    );
  },
});
