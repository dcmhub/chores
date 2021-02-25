module.exports = {
  extends: [
    'airbnb-base',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/babel.js'),
    require.resolve('./rules/weapp.js'),
    require.resolve('./rules/jsdoc.js'),

    'plugin:prettier/recommended',
  ],
};
