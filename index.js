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

    _.each(config('theme.pseudo', defaultPseudoTheme), (modifier, selector) => {
      addVariant(selector, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`${selector}${separator}${className}`)}${modifier == 'before' || modifier == 'after' ? '::' : ':'}${modifier}`;
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
