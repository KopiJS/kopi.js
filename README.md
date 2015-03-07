Kopi.JS
=======

> API for ordering Singaporean Coffee

Kopi.JS is an incredibly lightweight JavaScript library for parsing Kopi ingredients and converting them to a legit Kopi order string. It can also do it the other way around. It's built in ES6 and tested with Mocha.

Why?
----

Because we need specs for Singapore Coffee!

It all started from this Twitter conversation:
https://twitter.com/laktek/status/400080522656759808

Development setup
-----------------

Requires [Grunt](http://gruntjs.com/).

- `npm install` - set up all the tools
- `npm test` - run the specs
- `npm run dist` - generate the distribution files in `dist` folder

Documentation
-------------

Kopi.js can do **two** important things:

1. Accept a bunch of ingredients and generate the string for you.
2. Parse a Kopi order string and return the ingredients for you.

### `Kopi`

`Kopi` is a singleton, like `JSON`. The methods available are also similar:

- `Kopi.parse`
- `Kopi.stringify`

#### `Kopi.parse`

``` js
Kopi.parse('Kopi O');
// return {water: 0.5, coffee: 0.5, condensed_milk: 0, evaporated_milk: 0, sugar: 0, state: 'warm'}
```

Ingredients:

- `water` - number, default `1`, 0 to 1
- `coffee` - number, default `0`, 0 to 1
- `condensed_milk` (sweetened) - number, default `0`, 0 to 1
- `evaporated_milk` (unsweetened), number, default `0`, 0 to 1
- `sugar` - number, default `0`, 0 to infinite
- `state` - boolean, default `warm`, other values: `lukewarm` and `iced`

The sum of `water`, `coffee`, `condensed_milk` and `evaporated_milk` is always 1.

#### `Kopi.stringify`

``` js
Kopi.stringify({water: .5, coffee: .5});
// return 'Kopi O'
```

That simple.

License
-------

[MIT](http://cheeaun.mit-license.org/)
