module.exports = {
  extends: ['plugin:jest/recommended'],

  plugins: ['react-hooks'],

  env: {
    jest: true,
  },

  rules: {
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/sort-comp': 'warn',

    // JSX filename extensioins
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', 'tsx'],
      },
    ],

    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child',
      },
    ],

    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],

    // JSX A11y rules
    'jsx-a11y/click-events-have-key-events': 'off',

    // Add caption for medias
    'jsx-a11y/media-has-caption': [
      'error',
      {
        audio: ['Audio'],
        video: ['Video'],
        track: ['Track'],
      },
    ],

    // Fix Link component of next.js
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 26,
    },
  },
};
