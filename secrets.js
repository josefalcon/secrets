var fs = require('fs');

var Secrets = function(opts) {
  var file = 'secrets.json';
  var keys;

  if (isArray(opts)) {
    keys = opts;
  } else if (isObject(opts)) {
    file = opts.file || file;
    keys = opts.keys;
  }

  if (!keys) throw new Error('no keys defined');

  this.values = {}
  this.init(file, keys);
};

Secrets.prototype.init = function(file, keys) {
  var self = this;
  var env = process.env;
  var fb = {};

  try {
    fb = JSON.parse(fs.readFileSync(file));
  } catch(err) {
    // ignore file errors
  }

  keys.forEach(function(k) {
    var v = env[k.toUpperCase()] || fb[k];
    if (v === undefined || v === null) throw new Error(k + ' is undefined');

    self.values[k] = v;
  });
};

function isArray(obj) {
  return toString.call(obj) === '[object Array]';
};

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

module.exports = Secrets;
