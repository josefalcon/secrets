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

  delete process.env.CONSUMER_KEY;
});

test('fails to read from environment variables', function (t) {
  t.plan(1);

  process.env.consumer_key = 'secretvalue';

  t.throws(function() {
    var secrets = new Secrets([
      'consumer_key'
    ]);
  }, Error);

  delete process.env.consumer_key;
});

test('reads from explicit secrets.json', function (t) {
  t.plan(1);

  var secrets = new Secrets([
    'consumer_key'
  ], './tests/secrets.json');

  t.equal(secrets.values.consumer_key, 'myconsumerkey');
});

test('reads from required secrets.json', function (t) {
  t.plan(1);

  var secrets = new Secrets([
    'consumer_key'
  ], require('./secrets.json'));

  t.equal(secrets.values.consumer_key, 'myconsumerkey');
});

test('reads from first explicit fallback object', function (t) {
  t.plan(1);

  var secrets = new Secrets([
    'consumer_key'
  ], {consumer_key: 'secretvalue'});

  t.equal(secrets.values.consumer_key, 'secretvalue');
});

test('reads from second explicit fallback object', function (t) {
  t.plan(1);

  var secrets = new Secrets([
    'consumer_key'
  ], {}, {consumer_key: 'secretvalue'});

  t.equal(secrets.values.consumer_key, 'secretvalue');
});
