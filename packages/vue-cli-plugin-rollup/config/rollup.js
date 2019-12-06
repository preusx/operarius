const path = require('path');

const babel = require('rollup-plugin-babel');
const cjs = require('rollup-plugin-commonjs');
const node = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');
const VuePlugin = require('rollup-plugin-vue');

const { error } = require(require.resolve('@vue/cli-shared-utils'));

const { dependencies = {} } = require(path.resolve(process.cwd(), 'package.json'));
const classifyRE = /(?:^|[-_/])(\w)/g;
const toUpper = (_, c) => (c ? c.toUpperCase() : '');

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs', '.json'];
const DEFAULT_BABEL_CONFIG = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { useBuiltIns: false }],
  ],
  extensions: EXTENSIONS,
};
const presetKey = x => (Array.isArray(x) ? x[0] : x);
const DEFAULT_BABEL_PRESETS_KEYS = DEFAULT_BABEL_CONFIG.presets.map(presetKey);

let babelConfig = DEFAULT_BABEL_CONFIG;

try {
  babelConfig = require(path.resolve(process.cwd(), 'babel.config.js')); // eslint-disable-line global-require
  babelConfig.presets = (babelConfig.presets || [])
    .filter(preset => !DEFAULT_BABEL_PRESETS_KEYS.includes(presetKey(preset)))
    .concat(DEFAULT_BABEL_CONFIG.presets);
} catch (e) {
  error('No babel.config.js file found in the project. Using default.');
}

function getEntriesOptions(entryPath, sourcePath, destPath, moduleName, packageName, banner) {
  const resolve = _path => path.resolve(sourcePath, _path);
  const resolveDest = _path => path.resolve(destPath, _path);

  return {
    commonjs: {
      entry: resolve(entryPath),
      dest: resolveDest(`${packageName}.common.js`),
      format: 'cjs',
      banner,
    },
    esm: {
      entry: resolve(entryPath),
      dest: resolveDest(`${packageName}.esm.js`),
      format: 'es',
      banner,
    },
    production: {
      entry: resolve(entryPath),
      dest: resolveDest(`${packageName}.umd.min.js`),
      format: 'umd',
      env: 'production',
      moduleName,
      banner,
    },
    development: {
      entry: resolve(entryPath),
      dest: resolveDest(`${packageName}.umd.js`),
      format: 'umd',
      env: 'development',
      moduleName,
      banner,
    },
  };
}

function getPlugins(version, { env } = {}, aliases = {}) {
  const entries = Object.keys(aliases)
    .filter(key => key.match(/^vue/img) === null)
    .map(
      key => ({
        find: new RegExp(`^${key}`, 'img'),
        replacement: aliases[key],
      })
    );

  const plugins = [
    alias({
      entries,
      customResolver: node({
        extensions: EXTENSIONS,
      }),
    }),
    node({
      extensions: EXTENSIONS,
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    cjs(),
    VuePlugin(),
    babel({
      ...babelConfig,
      babelrc: false,
      runtimeHelpers: true,
    }),
  ];

  const replaceOptions = { __VERSION__: version };
  if (env) {
    replaceOptions['process.env.NODE_ENV'] = JSON.stringify(env);
  }
  plugins.push(replace(replaceOptions));

  return plugins;
}

function getEntryConfig(options, moduleName, version, aliases) {
  const plugins = getPlugins(version, options, aliases);
  return {
    input: options.entry,
    output: {
      file: options.dest,
      name: moduleName,
      exports: 'named',
      format: options.format,
      banner: options.banner,
      // TODO: sourcemap: 'inline'
    },
    // https://github.com/rollup/rollup/issues/1514#issuecomment-320438924
    external: Object.keys(dependencies),
    plugins,
  };
}

function getConfig(
  { name, version },
  { entry, source, dest, aliases },
  banner
) {
  const moduleName = name.replace(classifyRE, toUpper);
  const entries = getEntriesOptions(entry, source, dest, moduleName, name, banner);

  return Object.keys(entries).map(
    key => getEntryConfig(entries[key], moduleName, version, aliases)
  );
}

module.exports = {
  getConfig,
};
