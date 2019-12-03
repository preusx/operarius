const exampleCommand = require('./commands/example');

module.exports = api => {
  api.chainWebpack(config => {
    config
      .entry("app")
      .clear()
      .add("./src/index.js")
      .end();

    config.resolve.alias
      .set("@example", path.join(__dirname, "./example"));
  });

  const example = exampleCommand(api);
  api.registerCommand('example', example.opts, example.fn);
};
