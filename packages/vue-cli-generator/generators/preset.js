const fs = require('fs');

function generate(path, options) {
  const generator = require(`${path}/preset.js`); // eslint-disable-line global-require
  const content = generator(options);

  fs.writeFileSync(`${path}/preset.json`, JSON.stringify(content), 'utf8');
}

function clear(path) {
  const filePath = `${path}/preset.json`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

module.exports = { generate, clear };
