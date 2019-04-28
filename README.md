# Pseudo Selector Plugin for Tailwind CSS

## Installation

```sh
yarn add tailwindcss-pseudo
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
