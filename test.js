const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const pseudoPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            'sm': '640px',
          },
        },
        corePlugins: (function() {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          pseudoPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin does nothing if empty is false and the variants aren’t used', () => {
  return generatePluginCss({}, { empty: false }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('the plugin only creates empty if the variants aren’t used', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .empty {
        content: ''
      }
    `);
  });
});

test('the before variant is working', () => {
  return generatePluginCss({
    variants: {
      empty: ['before'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .empty {
        content: ''
      }
      .before\\:empty::before {
        content: ''
      }
    `);
  });
});

test('the after variant is working', () => {
  return generatePluginCss({
    variants: {
      empty: ['after'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .empty {
        content: ''
      }
      .after\\:empty::after {
        content: ''
      }
    `);
  });
});

test('multiple variants can be used together', () => {
  return generatePluginCss({
    variants: {
      empty: ['before', 'after', 'responsive'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .empty {
        content: ''
      }
      .before\\:empty::before {
        content: ''
      }
      .after\\:empty::after {
        content: ''
      }
      @media (min-width: 640px) {
        .sm\\:empty {
          content: ''
        }

        .sm\\:before\\:empty::before {
          content: ''
        }

        .sm\\:after\\:empty::after {
          content: ''
        }
      }
    `);
  });
});
