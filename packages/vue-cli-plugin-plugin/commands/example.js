const path = require('path');
const Service = require('@vue/cli-service'); // eslint-disable-line import/no-unresolved

function plugin(context, entry) {
  return {
    id: '@operarius/vue-cli-plugin-plugin/example',
    apply(api) {
      const entryDir = path.dirname(entry);

      api.chainWebpack(config => {
        config
          .entry('app')
          .clear()
          .add(path.resolve(context, entry));

        config.resolve.alias
          .set('@example', path.resolve(context, entryDir));

        config
          .plugin('html')
          .tap(args => {
            args[0].template = path.resolve(context, path.join(entryDir, 'index.html')); // eslint-disable-line no-param-reassign
            return args;
          });

        config.plugins.delete('copy');
      });
    },
  };
}

function service(context, entry, args, command) {
  return new Service(context, {
    plugins: [
      plugin(context, entry),
    ],
  }).run(command, args);
}

module.exports = api => ({
  opts: {
    description: 'Plugin example runner',
    usage: 'vue-cli-service example [options] entry',
  },
  fn: async args => {
    const context = api.getCwd();
    const entry = args._[0] || './example/main.js';
    const open = true;
    const command = 'serve';
    const customArgs = { open };

    return service(context, entry, customArgs, command);
  },
});
