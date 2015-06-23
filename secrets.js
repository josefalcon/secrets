var fs = require('fs');

var Secrets = function(keys) {
  if (!keys) throw new Error('no keys defined');

  var values = this.values = {};
  var fallbacks = Array.prototype.slice.call(arguments, 1);
  if (!fallbacks || fallbacks.length === 0) {
    fallbacks = [process.env, 'secrets.json'];
  }

  var unset = keys;
  for (var i = 0; unset.length > 0 && i < fallbacks.length; i++) {
    var fallback = fallbacks[i];
    if (isString(fallback)) fallback = this.readFile(fallback);
    if (!isObject(fallback)) throw new Error('invalid fallback: not an object');

    unset = this.resolve(unset, fallback);
  }

  keys.forEach(function(k) {
    var v = values[k];
    if (v === undefined || v === null) throw new Error(k + ' is undefined');
  });
}

Secrets.prototype.readFile = function(file) {
  try {
    return JSON.parse(fs.readFileSync(file));
  } catch(err) {
    // ignore file errors
    return {};
  }
};

Secrets.prototype.resolve = function(keys, obj) {
  var self = this;
  var unset = [];
  var upper = obj == process.env;

  keys.forEach(function(k) {
    var v = upper ? obj[k.toUpperCase()] : obj[k];
    if (v === undefined || v === null) {
      unset.push(k);
    } else {
      self.values[k] = v;
    }
  });
  return unset;
};

// from: http://underscorejs.org/docs/underscore.html
function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

// from: http://underscorejs.org/docs/underscore.html
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

module.exports = Secrets;
