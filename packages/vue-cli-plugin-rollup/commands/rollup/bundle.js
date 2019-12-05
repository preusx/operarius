const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const uglify = require('uglify-js');
const chalk = require('chalk');
const rollup = require('rollup');

const { error, log } = require(require.resolve('@vue/cli-shared-utils')); // eslint-disable-line import/no-dynamic-require

const getSize = code => `${(code.length / 1024).toFixed(2)}kb`;

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    const report = extra => {
      log(`${chalk.blue.bold(path.relative(process.cwd(), dest))} ${getSize(code) + (extra || '')}`);
      resolve();
    };

    fs.writeFile(dest, code, err => { // eslint-disable-line consistent-return
      if (err) { return reject(err); }
      if (zip) {
        zlib.gzip(code, (e, zipped) => { // eslint-disable-line consistent-return
          if (e) { return reject(e); }
          report(` (gzipped: ${getSize(zipped)})`);
        });
      } else {
        report();
      }
    });
  });
}

function bundleEntry(config) {
  const { output } = config;
  const { file, banner } = output;
  const isProd = /min\.js$/.test(file);
  return rollup.rollup(config)
    .then(b => b.generate(output))
    .then(({ output: [{ code }] }) => {
      if (isProd) {
        const minified = (banner ? `${banner}\n` : '') + uglify.minify(code, {
          fromString: true,
          output: { ascii_only: true },
          compress: { pure_funcs: ['makeMap'] },
        }).code;
        return write(file, minified, true);
      }
      return write(file, code);
    });
}

async function bundle(entries) {
  log('Building for production mode as plugin ...');

  for (let i = 0; i < entries.length; i++) {
    try {
      await bundleEntry(entries[i]); // eslint-disable-line no-await-in-loop
    } catch (e) {
      error(e);
    }
  }

  log();
  log(`Build complete. The ${chalk.cyan('dist')} directory is ready to be deployed.`);
}

module.exports = bundle;
