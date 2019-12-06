const { devDependencies } = require('./package.json');

const LIBRARY_NAME = 'git-hooks';
const GIT_HOOKS = `@operarius/${LIBRARY_NAME}`;

function andValues(old, current) {
  const result = { ...old, ...current };

  Object.keys(result).forEach(key => {
    if (key in old && key in current) {
      result[key] = `${old[key]} && ${current[key]}`;
    }
  });

  return result;
}

module.exports = api => {
  api.extendPackage({
    gitHooks: andValues(api.generator.pkg.gitHooks, {
      'pre-commit': 'operarius-git-hooks pre-commit',
      'pre-push': 'operarius-git-hooks pre-push',
      'post-commit': 'operarius-git-hooks post-commit',
      'post-checkout': 'operarius-git-hooks post-checkout',
      'post-merge': 'operarius-git-hooks post-merge',
      'commit-msg': 'operarius-git-hooks commit-msg',
    }),
    devDependencies: {
      [GIT_HOOKS]: process.env.VUE_CLI_GENERATOR_INTERNAL_MODE
        ? `file:../packages/${LIBRARY_NAME}`
        : devDependencies[GIT_HOOKS],
    },
  });
};
