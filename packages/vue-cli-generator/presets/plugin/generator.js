module.exports = api => {
  if (process.env.VUE_CLI_GENERATOR_INTERNAL_MODE) {
    api.extendPackage({
      workspaces: [
        '../packages/*',
      ],
    });
  }
};
