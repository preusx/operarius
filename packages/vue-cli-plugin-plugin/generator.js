const { version } = require('./package.json');

module.exports = (api, options, rootOptions) => {
  const { projectName } = rootOptions;

  api.extendPackage({
    scripts: {
      'prepublish': 'vue-cli-service lint && vue-cli-service docs --mode build && vue-cli-service build',
      'start': 'vue-cli-service serve',
      'demo': 'vue-cli-service demo',
      'docs': 'npm run docs:serve',
      'docs:serve': 'vue-cli-service docs --mode serve',
      'docs:build': 'vue-cli-service docs --mode build'
    },
    sideeffects: false,
    main: `dist/${projectName}.common.js`,
    jsdelivr: `dist/${projectName}.umd.min.js`,
    module: `dist/${projectName}.esm.js`,
    unpkg: `dist/${projectName}.umd.min.js`,
    files: [
      `dist/${projectName}.common.js`,
      `dist/${projectName}.umd.min.js`,
      `dist/${projectName}.umd.js`,
      `dist/${projectName}.esm.js`,
      'src'
    ]
  });
};
