const fs = require('fs');

function generate(path, options) {
  const generator = require(`${path}/preset.js`);
  const content = generator(options);

  fs.writeFileSync(`${path}/preset.json`, JSON.stringify(content), 'utf8');
}

function clear(path) {
  fs.unlinkSync(`${path}/preset.json`);
}

module.exports = { generate, clear };
