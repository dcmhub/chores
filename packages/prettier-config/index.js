const prettierConfig = {
  /** Specify the line length that the printer will wrap on. */
  printWidth: 100,

  /** Specify the number of spaces per indentation-level. */
  tabWidth: 2,

  /** Indent lines with tabs instead of spaces. */
  useTabs: false,

  /** Print semicolons at the ends of statements. */
  semi: true,

  /** Use single quotes instead of double quotes. */
  singleQuote: true,

  /** Change when properties in objects are quoted. */
  quoteProps: 'consistent',

  /** Use single quotes instead of double quotes in JSX. */
  jsxSingleQuote: false,

  /** Print trailing commas wherever possible when multi-line. */
  trailingComma: 'all',

  /** Print spaces between brackets in object literals. */
  bracketSpacing: true,

  /** Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). */
  jsxBracketSameLine: false,

  /** Include parentheses around a sole arrow function parameter. */
  arrowParens: 'always',

  /** By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer, e.g. GitHub comment and BitBucket. In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out with "never". */
  proseWrap: 'preserve',

  /** Specify the global whitespace sensitivity for HTML files. */
  htmlWhitespaceSensitivity: 'css',

  /** Whether or not to indent the code inside <script> and <style> tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor. */
  vueIndentScriptAndStyle: true,

  /** Ensure Prettier’s endOfLine option is set to lf (this is a default value since v2.0.0). */
  endOfLine: 'lf',

  /** Control whether Prettier formats quoted code embedded in the file. */
  embeddedLanguageFormatting: 'off',
};

module.exports = prettierConfig;
