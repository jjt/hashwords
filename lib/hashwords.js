(function() {
  var _defaults, _inRange, _isArray, _isNumber, adjectives, arrayElFromInt, filterStrArrayByLen, intFromHexStr, md5, nouns, randomEl, randomInt, upperFirst;

  md5 = require('./md5').md5;

  adjectives = require('./adjectives');

  nouns = require('./nouns');

  _defaults = require('lodash/defaults');

  _isArray = require('lodash/isArray');

  _isNumber = require('lodash/isNumber');

  _inRange = require('lodash/inRange');

  upperFirst = function(str) {
    if (str === '' || (str == null)) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Takes an array, an integer and its range (max/min) and returns an element
  // from the array corresponding to the integer's positon in the range
  arrayElFromInt = function(arr, int, intmax = Math.pow(16, 8), intmin = 0) {
    var index, ratio;
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

  intFromHexStr = function(hex, index = 0, len = 8) {
    return parseInt(hex.substr(index * len, len), 16);
  };

  filterStrArrayByLen = function(arr, len) {
    if (!(_isNumber(len) || _isArray(len))) {
      return arr;
    }
    return arr.filter(function(str) {
      var end, start;
      if (_isArray(len)) {
        [start, end] = len;
      } else {
        start = end = len;
      }
      return _inRange(str.length, start, end + 1);
    });
  };

  module.exports = function(opts = {}) {
    var _options, filteredCorpus, hash, hashStr, random, randomStr, tokensFromString;
    _options = _defaults(opts, {
      salt: '',
      strPattern: "adj noun noun",
      wordLength: false,
      corpus: {
        noun: nouns,
        adj: adjectives
      }
    });
    filteredCorpus = function() {};
    tokensFromString = function(hash, opts = {}) {
      var corpusKeys, options;
      options = _defaults(opts, {
        strPattern: _options.strPattern,
        wordLength: _options.wordLength
      });
      corpusKeys = options.strPattern.split(' ');
      // We need 8 hex chars per token, so make sure hash is long enough
      while (hash.length < corpusKeys.length * 8) {
        hash += md5(hash);
      }
      return corpusKeys.map(function(key, index) {
        var localCorpus;
        localCorpus = _options.corpus[key];
        if (options.wordLength) {
          localCorpus = filterStrArrayByLen(localCorpus, options.wordLength);
        }
        return upperFirst(arrayElFromInt(localCorpus, intFromHexStr(hash, index)));
      });
    };
    hash = function(input, salt = _options.salt, options = {}) {
      var inputHash;
      // Get md5 of input
      inputHash = md5(salt + input);
      return tokensFromString(inputHash, options);
    };
    random = function(input, options) {
      var inputHash;
      // Double random for input length purposes
      inputHash = md5('' + _options.salt + Math.random() + Math.random());
      return tokensFromString(inputHash, options);
    };
    hashStr = function(input, options) {
      return hash(input, options).join(' ');
    };
    randomStr = function(input, options) {
      return random(input, options).join(' ');
    };
    return {hash, hashStr, random, randomStr, _options};
  };

}).call(this);
