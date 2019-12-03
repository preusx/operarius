const fs = require('fs');
const path = require('path');

function clearDirectory(context, directory, templatePath) {
  const files = fs.readdirSync(path.join(context, directory), { withFileTypes: true });

  for (file of files) {
    if (file.isDirectory()) {
      clearDirectory(context, path.join(directory, file.name), templatePath);
    } else {
      const p = path.join(directory, file.name);

      if (!fs.existsSync(path.join(templatePath, p))) {
        fs.unlinkSync(path.join(context, p));
      }
    }
  }

  fs.rmdir(path.join(context, directory), () => {});
}

module.exports = (api, options, rootOptions) => {
  const { projectName } = rootOptions;
  const templateSrc = path.dirname(path.dirname(require.resolve('./template/src')));

  api.extendPackage({
    scripts: {
      'build': `vue-cli-service build --target lib --name ${projectName} --dest dist/`,
      'serve': 'vue-cli-service example demo/main.js',
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
      'src'
    ]
  });

  api.render('./template');

  api.onCreateComplete(() => {
    // We do not need other files that those we have in plugin's template
    clearDirectory(api.generator.context, path.dirname(api.entryFile), templateSrc);
  });
};
