const fs = require('fs');
const path = require('path');

function clearDirectory(context, directory, templatePath) {
  const files = fs.readdirSync(path.join(context, directory), { withFileTypes: true });

  files.forEach(file => {
    if (file.isDirectory()) {
      clearDirectory(context, path.join(directory, file.name), templatePath);
    } else {
      const p = path.join(directory, file.name);

      if (!fs.existsSync(path.join(templatePath, p))) {
        fs.unlinkSync(path.join(context, p));
      }
    }
  });

  fs.rmdir(path.join(context, directory), () => {});
}

module.exports = (api, options, rootOptions) => {
  const { projectName } = rootOptions;
  const templateSrc = path.dirname(path.dirname(require.resolve('./template/base/src/main')));

  api.extendPackage({
    scripts: {
      prepublishOnly: 'yarn lint && yarn test:unit && yarn build',
      build: `vue-cli-service build src/index.js --target lib --name ${projectName} --dest dist/`,
      serve: 'vue-cli-service example example/main.js',
      lint: 'vue-cli-service plugin-lint',
    },
    sideeffects: false,
    main: `dist/${projectName}.common.js`,
    jsdelivr: `dist/${projectName}.umd.min.js`,
    unpkg: `dist/${projectName}.umd.min.js`,
    style: `dist/${projectName}.css`,
    files: [
      `dist/${projectName}.common.js`,
      `dist/${projectName}.umd.min.js`,
      `dist/${projectName}.umd.js`,
      `dist/${projectName}.css`,
      'src',
    ],
  });

  api.render('./template/base');

  if (api.hasPlugin('unit-jest')) {
    api.render('./template/tests/jest');
  }

  api.onCreateComplete(() => {
    // We do not need other files that those we have in plugin's template
    clearDirectory(api.generator.context, path.dirname(api.entryFile), templateSrc);
  });
};
