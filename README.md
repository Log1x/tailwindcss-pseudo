# Tailwind CSS Pseudo Selector Plugin

![Package Version](https://img.shields.io/npm/v/tailwindcss-pseudo?style=flat-square)
![Package Total Downloads](https://img.shields.io/npm/dt/tailwindcss-pseudo?style=flat-square)

## Requirements

- [Tailwind CSS](https://tailwindcss.com/) >= v1.0.0

## Installation

Install via Yarn:

```sh
$ yarn add tailwindcss-pseudo
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    backgroundColor: {
      'black': 'black',
    },
    pseudo: { // defaults to {'before': 'before', 'after': 'after'}
      'before': 'before',
      'after': 'after',
      'not-first': 'not(:first-child)',
    }
  },
  variants: {
    backgroundColor: ['not-first'],
    empty: ['before', 'after'], // defaults to []
  },
  plugins: [
    require('tailwindcss-pseudo')({
      empty: true, // defaults to true
    }),
  ],
}
```

This plugin generates the following utilities:

```css
.bg-black {
  background-color: black;
}

.not-first\:bg-black:not(:first-child) {
  background-color: black;
}

.empty {
  content: '';
}

.before\:empty::before {
  content: '';
}

.after\:empty::after {
  content: '';
}
```

## Testing

Tests are handled with [Jest](https://github.com/facebook/jest) and can be ran using:

```sh
$ yarn run test
```

## Bug Reports

If you discover a bug in Tailwind CSS Pseudo, please [open an issue](https://github.com/log1x/tailwindcss-pseudo/issues).

## Contributing

Contributing whether it be through PRs, reporting an issue, or suggesting an idea is encouraged and appreciated.

## License

Tailwind CSS Pseudo provided under the [MIT License](https://github.com/log1x/tailwindcss-pseudo/blob/master/LICENSE.md).
