# secrets

Secrets is a small library for reading secrets files or environment variables.

```javascript
var Secrets = require('secrets');

var secrets = new Secrets([
  'consumer_key',
  'consumer_secret',
  'access_token_key',
  'access_token_secret'
]);

console.log(secrets.values.consumer_key);    // "myconsumerkey"
console.log(secrets.values.consumer_secret); // "myconsumersecret"
```

## Installation

```sh
npm install secrets
```

## Resolution

By default secrets are resolved in the following order,

0. Environment variables,
0. secrets.json

Environment variables are resolved by querying `process.env` for each key
specified in the constructor. By convention, environment variables are
capitalized in [snakecase][snakecase], thus, each key is resolved by first
uppercasing the value. No other transformation is done to the key.

```javascript
process.env[key.toUpperCase()]
```

If a specified key is `undefined` or `null` after resolution, an error
is thrown.

TODO: should there be an option to disable such errors?

If keys cannot be resolved through `process.env`, a secret file called
`secrets.json` is read from the current working directory.

### Explicit Resolution Order

Explicit resolution order is specified by manually passing in fallback objects
to the constructor after the list of keys.

```javascript
var inMemoryValues = {
  // ...
};

var secrets = new Secrets([
  'consumer_key',
  'consumer_secret',
  'access_token_key',
  'access_token_secret'
], localStorage, inMemoryValues, process.env, '/path/to/secrets.json');
```

Specify files as fallbacks by passing the path as a string.

## Secret Files

Secret files are specified in a _flat_ JSON file.

```json
{
  "consumer_key": "myconsumerkey",
  "consumer_secret": "myconsumersecret",
  "access_token_key": "myaccesstoken",
  "access_token_secret": "myaccessstokensecret"
}
```

Secret files are read _synchronously_ when the object is constructed. A file is
only read if it is needed to resolve keys.

> Note: Secrets should never be committed to source control. Update `.gitignore`
> to prevent your secrets file from accidentally ending up in a public space.

## Reading

Secrets are read through the `values` property.

```javascript
secrets.values.consumer_key
```

The `values` property is an object containing a value for every key the
secrets object was initialized with. This can be used and passed directly
to API libraries that require secrets for authentication.

```javascript
var Secrets = require('secrets');
var Twitter = require('twitter');

var secrets = new Secrets([
  'consumer_key',
  'consumer_secret',
  'access_token_key',
  'access_token_secret'
]);

var client = new Twitter(secrets.values);
```
## Options

TODO:

* fail on undefined
* sync, async?

[snakecase]: http://en.wikipedia.org/wiki/Snake_case
