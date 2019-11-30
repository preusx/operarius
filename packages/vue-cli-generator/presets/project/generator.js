module.exports = (api, options, rootOptions) => {
  if (process.env.VUE_CLI_GENERATOR_INTERNAL_MODE) {
    api.extendPackage({
      'workspaces': [
        '../packages/*',
      ],
    });
  }
};
