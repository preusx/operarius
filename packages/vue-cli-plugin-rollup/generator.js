module.exports = (api, options, rootOptions) => {
  const { projectName } = rootOptions;

  api.extendPackage({
    scripts: {
      build: 'vue-cli-service rollup',
    },
    sideeffects: false,
    main: `dist/${projectName}.common.js`,
    jsdelivr: `dist/${projectName}.umd.min.js`,
    unpkg: `dist/${projectName}.umd.min.js`,
    module: `dist/${projectName}.esm.js`,
    style: `dist/${projectName}.css`,
    files: [
      `dist/${projectName}.common.js`,
      `dist/${projectName}.umd.min.js`,
      `dist/${projectName}.umd.js`,
      `dist/${projectName}.esm.js`,
      `dist/${projectName}.css`,
      'src',
    ],
  });
};
