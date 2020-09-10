const postcssConfig = {
  plugins: {
    'postcss-import': {},
    'postcss-normalize': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'blank-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'image-set-function': true,
        'matches-pseudo-class': true,
        'nesting-rules': true,
        'not-pseudo-class': true,
        'overflow-property': true,
        'overflow-wrap-property': true,
        'place-properties': true,
        'prefers-color-scheme-query': true,
        'system-ui-font-family': true,
      },
    },
  },
};

export default postcssConfig;
