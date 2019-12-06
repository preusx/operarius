#!/usr/bin/env node

const MAN = `Usage: operarius-git-hooks <hook-name>

Options:
  <hook-name>                                Hook name.

  -h, --help                                 Output usage information.
  -p, --path                                 Local path to the custom hooks directory.
  -i, --internal-only                        Run only hooks from project directory.`;

const path = require('path');
const minimist = require('minimist');
const { error } = require('../utils');

const rawArgv = process.argv.slice(2);
const passed = minimist(rawArgv, {
  '--': true,
  boolean: ['i', 'internal-only', 'h', 'help'],
});

function hookRunner(hookPath, args) {
  let hook = null;

  try {
    hook = require(hookPath); // eslint-disable-line global-require
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }

    return;
  }

  hook(args);
}

function run(args) {
  const [hookName = null] = args._;

  if (hookName === null) {
    error(
      '<hook-name> argument is required. Use --help to examine command parameters.'
    );
  }

  const internalOnly = args['internal-only'] || args.i || false;
  const localPath = args.path || args.p || './hooks';
  const hooks = [
    path.normalize(path.join(process.cwd(), localPath, hookName)),
  ];

  if (!internalOnly) {
    hooks.push(
      path.normalize(path.join(__dirname, '..', 'hooks', hookName))
    );
  }

  hooks.forEach(hookPath => hookRunner(hookPath, args));
}

function help() {
  process.stdout.write(MAN);
}

if (passed.help || passed.h) {
  help();
  process.exit(0);
}

run(passed);
