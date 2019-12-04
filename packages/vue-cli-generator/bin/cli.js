#!/usr/bin/env node

const MAN = `Usage: operarius-vue-create <app-name> <preset> -- [options]

Options:
  -h, --help                                 Output usage information.

Commands:
  <preset>                                   Use preset you want. Default: project.
  <app-name>                                 Name of the project you want to create.
  [options]                                  Optional \`vue\` cli additional options for \`create\` command.`;

const { spawn } = require('child_process');
const path = require('path');
const minimist = require('minimist');
const preset = require('../generators/preset');

const rawArgv = process.argv.slice(2);
const passed = minimist(rawArgv, {
  '--': true,
});

function create(args) {
  const [name, presetName = 'project'] = args._;
  const { internal } = args;
  const presetPath = path.dirname(require.resolve(`../presets/${presetName}`));

  const parameters = [
    'create', name || '', '--preset', presetPath,
  ].concat(args['--']);

  preset.generate(presetPath, { internal });

  const subprocess = spawn('vue', parameters, {
    stdio: [process.stdin, process.stdout, process.stderr],
    env: {
      ...process.env,
      VUE_CLI_GENERATOR_INTERNAL_MODE: internal || undefined,
    },
    shell: true,
  });

  subprocess.on('close', code => {
    preset.clear(presetPath);
    process.exit(code);
  });
}

function help() {
  process.stdout.write(MAN);
}

if (passed.help || passed.h) {
  help();
  process.exit(0);
}

create(passed);
