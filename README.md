# secrets

Secrets is a small library for reading secrets files or environment variables.

```javascript
var secrets = require('secrets');

var secrets = new Secrets([
  'consumer_key',
  'consumer_secret',
  'access_token_key',
  'access_token_secret'
]);

console.log(secrets.values.consumer_key);
console.log(secrets.values.consumer_secret);
```

## Installation

```sh
npm install secrets
```

## Resolution

Secrets are resolved in the following order,

0. Environment variables
0. Secrets file

Environment variables are resolved by querying `process.env` for each key
specified in the constructor. By convention, environment variables are
capitalized in [snakecase][snakecase], thus, each key is resolved by first
uppercasing the value. No other transformation is done to the key.

```javascript
process.env[key.toUpperCase()]
```

## Secrets File

The backup secrets file can be configured by passing an options object to the
constructor.

```javascript
var secrets = new Secrets({
  file: '/path/to/secrets.json',
  keys: [
    'consumer_key',
    'consumer_secret',
    'access_token_key',
    'access_token_secret'
  ],
})
```

By default, the backup file is assumed to be `secrets.json` in the working
directory.

> Note: Secrets should never be committed to source control. Update `.gitignore`
> to prevent your secrets file from accidentally ending up in a public space.

## Options

TODO:

* fail on undefined
* sync, async?

[snakecase]: http://en.wikipedia.org/wiki/Snake_case
