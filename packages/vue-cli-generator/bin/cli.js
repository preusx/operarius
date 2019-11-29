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

const rawArgv = process.argv.slice(2);
const passed = require('minimist')(rawArgv, {
  '--': true,
});

if (passed.help || passed.h) {
  return help();
}

create(passed);

function create(args) {
  const [name, preset = 'project'] = args._;
  const presetPath = path.dirname(require.resolve(`../presets/${preset}`));

  const parameters = [
    'create', name || '', '--preset', presetPath
  ].concat(args['--']);

  const subprocess = spawn('vue', parameters, {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true
  });

  subprocess.on('close', process.exit);
}

function help() {
  console.log(MAN);
}
