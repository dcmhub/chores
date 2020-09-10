const { utils } = require('@commitlint/config-lerna-scopes');

const commitlintConfig = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
  rules: {
    'scope-enum': async (ctx) => [2, 'always', [...(await utils.getPackages(ctx)), 'release']],
  },
};

module.exports = commitlintConfig;
