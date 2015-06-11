# secrets

```javascript
var secrets = require('secrets');

var secrets = new Secrets({
  file: '', // defaults to secrets.json
  keys: [
    'consumer_key',
    'consumer_secret',
    'access_token_key',
    'access_token_secret'
  ],
})

var secrets = new Secrets([
  'consumer_key',
  'consumer_secret',
  'access_token_key',
  'access_token_secret'
]);
```

```javascript

secrets.values.consumer_key
secrets.values.consumer_secret

```

Resolution order:
* environment variables
* file

Options:
* fail on undefined
* sync, async?
