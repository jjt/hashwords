(function() {
  var adjectives, arrayElFromInt, intFromHexStr, md5, nouns, randomEl, randomInt, upperFirst;

  md5 = require('./md5').md5;

  adjectives = require('./adjectives');

  nouns = require('./nouns');

  upperFirst = function(str) {
    if (str === '' || (str == null)) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  arrayElFromInt = function(arr, int, intmax, intmin) {
    var index, ratio;
    if (intmax == null) {
      intmax = Math.pow(16, 8);
    }
    if (intmin == null) {
      intmin = 0;
    }
    ratio = int / (intmax - intmin);
    index = Math.floor(ratio * arr.length);
    return arr[index];
  };

  randomEl = function(arr) {
    return arr[randomInt(0, arr.length - 1)];
  };

  randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  intFromHexStr = function(hex, index, len) {
    if (index == null) {
      index = 0;
    }
    if (len == null) {
      len = 8;
    }
    return parseInt(hex.substr(index * len, len), 16);
  };

  module.exports = function(opts) {
    var corpus, hash, hashStr, random, randomStr, salt, strPattern, tokensFromString;
    if (opts == null) {
      opts = {};
    }
    salt = opts.salt || '';
    strPattern = opts.strPattern || "adj noun noun";
    corpus = opts.corpus || {
      noun: nouns,
      adj: adjectives
    };
    tokensFromString = function(hash, pattern) {
      var corpusKeys;
      if (pattern == null) {
        pattern = strPattern;
      }
      corpusKeys = pattern.split(' ');
      while (hash.length < corpusKeys.length * 8) {
        hash += md5(hash);
      }
      return corpusKeys.map(function(key, index) {
        return upperFirst(arrayElFromInt(corpus[key], intFromHexStr(hash, index)));
      });
    };
    hash = function(input) {
      var inputHash;
      inputHash = md5(salt + input);
      return tokensFromString(inputHash);
    };
    random = function(input) {
      var inputHash;
      inputHash = md5('' + salt + Math.random() + Math.random());
      return tokensFromString(inputHash);
    };
    hashStr = function(input) {
      return hash(input).join(' ');
    };
    randomStr = function(input) {
      return random(input).join(' ');
    };
    return {
      hash: hash,
      hashStr: hashStr,
      random: random,
      randomStr: randomStr,
      corpus: corpus,
      salt: salt
    };
  };

}).call(this);
