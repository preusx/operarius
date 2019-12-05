module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb-base'),
  ],
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
    ],
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'arrow-parens': ['error', 'as-needed'],
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'ignore', ':': 'ignore' } }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex/redux state
        'acc', // for reduce accumulators
        'e', // for e.returnValue
      ]
    }],
  }
};
