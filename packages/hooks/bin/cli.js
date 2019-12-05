#!/usr/bin/env node

const MAN = `Usage: operarius-hooks <hook-name>

Options:
  <hook-name>                                Hook name.

  -h, --help                                 Output usage information.
  -p, --path                                 Local path to the custom hooks directory.
  -i, --internal-only                        Run only hooks from project directory.`;

const minimist = require('minimist');

const rawArgv = process.argv.slice(2);
const passed = minimist(rawArgv, {
  '--': true,
});

function run(args) {
  const [hookName = 'project'] = args._;
  let hook = null;

  try {
    hook = require(`../hooks/${hookName}`);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }

    process.exit(0);
  }

  hook(args);
}

function help() {
  process.stdout.write(MAN);
}

if (passed.help || passed.h) {
  help();
  process.exit(0);
}

run(passed);
