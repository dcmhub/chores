const { utils } = require('@commitlint/config-lerna-scopes');

const commitlintConfig = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
  rules: {
    'scope-enum': async (context) => [
      2,
      'always',
      [...(await utils.getPackages(context)), 'release'],
    ],
  },
};

module.exports = commitlintConfig;
