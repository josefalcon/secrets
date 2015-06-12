var test = require('tape');
var Secrets = require('../secrets');

test('throws on keys undefined', function (t) {
  t.plan(1);
  t.throws(Secrets, Error);
});

test('reads from environment variables', function (t) {
  t.plan(1);

  process.env.CONSUMER_KEY = 'secretvalue';
  var secrets = new Secrets([
    'consumer_key'
  ]);

  t.equal(secrets.values.consumer_key, 'secretvalue');
});

test('fails to read from environment variables', function (t) {
  t.plan(1);

  process.env.consumer_key = 'secretvalue';
  var secrets = new Secrets([
    'consumer_key'
  ]);

  t.throws(secrets.values.consumer_key, Error);
});
