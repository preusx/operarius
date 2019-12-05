const rollupCommand = require('./commands/rollup');

module.exports = api => {
  const rollup = rollupCommand(api);
  api.registerCommand('rollup', rollup.opts, rollup.fn);
};
