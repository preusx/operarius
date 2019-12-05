const path = require('path');
const exampleCommand = require('./commands/example');
const lintCommand = require('./commands/lint');

module.exports = api => {
  api.chainWebpack(config => {
    config.resolve.alias
      .set('@example', path.join(__dirname, './example'));
  });

  const example = exampleCommand(api);
  const lint = lintCommand(api);
  api.registerCommand('example', example.opts, example.fn);
  api.registerCommand('plugin-lint', lint.opts, lint.fn);
};
