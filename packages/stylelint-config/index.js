const stylelintConfig = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    './css-modules',
    './concentric-order',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['icon'],
      },
    ],
    'no-descending-specificity': null,
    'value-keyword-case': null,

    // Support miniprogram rpx unit
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    // Support custom elements and miniprogram components
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
        ignoreTypes: ['camera', 'editor', 'icon', 'navigator', 'page', 'slider', 'swiper'],
      },
    ],

    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};

module.exports = stylelintConfig;
