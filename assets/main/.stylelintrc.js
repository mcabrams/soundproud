module.exports = {
  "plugins": [
    "stylelint-selector-bem-pattern"
  ],
  "rules": {
    "plugin/selector-bem-pattern": {
      "preset": "bem",
      "implicitComponents": true,
      componentSelectors: function(componentName) {
        var WORD = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';
        var ampersand = '(?:\&)*';
        var element = '(?:__' + WORD + ')?';
        var modifier = '(?:--' + WORD + '){0,2}';
        var attribute = '(?:\\[.+\\])?';

        regex = '^' + ampersand + '\\.' + componentName + element + modifier + attribute + '$';
        return new RegExp(regex);
      }
    },
    "at-rule-name-case": "lower",
    "block-no-empty": null,
    "color-hex-case": "lower",
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-space-after": "always",
    "function-name-case": "lower",
    "function-url-quotes": "always",
    "indentation": 2,
    "length-zero-no-unit": true,
    "max-empty-lines": 2,
    "media-feature-name-case": "lower",
    "no-duplicate-selectors": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "number-no-trailing-zeros": true,
    "property-case": "lower",
    "rule-empty-line-before": ["always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"],
    }],
    "selector-pseudo-class-case": "lower",
    "selector-pseudo-element-case": "lower",
    "selector-type-case": "lower",
    "unit-case": "lower",
  }
}
