const _ = require('lodash');

module.exports = function(options = {}) {
  return ({ config, e, addVariant, addUtilities }) => {
    const defaultOptions = {
      empty: true,
    };
    options = _.merge({}, defaultOptions, options);

    const defaultEmptyVariants = [];
    const defaultPseudoTheme = {
      'before': 'before',
      'after': 'after',
    };

    const pseudoElements = [
      '-moz-progress-bar',
      '-moz-range-progress',
      '-moz-range-thumb',
      '-moz-range-track',
      '-ms-browse',
      '-ms-check',
      '-ms-clear',
      '-ms-expand',
      '-ms-fill',
      '-ms-fill-lower',
      '-ms-fill-upper',
      '-ms-reveal',
      '-ms-thumb',
      '-ms-ticks-after',
      '-ms-ticks-before',
      '-ms-tooltip',
      '-ms-track',
      '-ms-value',
      '-webkit-progress-bar',
      '-webkit-progress-value',
      '-webkit-slider-runnable-track',
      '-webkit-slider-thumb',
      'after',
      'backdrop',
      'before',
      'cue',
      'first-letter',
      'first-line',
      'grammar-error',
      'placeholder',
      'selection',
      'spelling-error',
    ];

    _.each(config('theme.pseudo', defaultPseudoTheme), (modifier, selector) => {
      addVariant(selector, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`${selector}${separator}${className}`)}${pseudoElements.includes(modifier) ? '::' : ':'}${modifier}`;
        });
      });
    });

    if (options.empty) {
      addUtilities({
        '.empty': { 'content': `''` }
      }, config('variants.empty', defaultEmptyVariants));
    }
  };
};
