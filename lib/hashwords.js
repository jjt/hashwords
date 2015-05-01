(function() {
  var adjectives, arrayElFromInt, filterStrArrayByLen, intFromHexStr, md5, nouns, randomEl, randomInt, upperFirst, _defaults, _inRange, _isArray, _isNumber;

  md5 = require('./md5').md5;

  adjectives = require('./adjectives');

  nouns = require('./nouns');

  _defaults = require('lodash/object/defaults');

  _isArray = require('lodash/lang/isArray');

  _isNumber = require('lodash/lang/isNumber');

  _inRange = require('lodash/number/inRange');

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

  filterStrArrayByLen = function(arr, len) {
    if (!(_isNumber(len) || _isArray(len))) {
      return arr;
    }
    return arr.filter(function(str) {
      var end, start;
      if (_isArray(len)) {
        start = len[0], end = len[1];
      } else {
        start = end = len;
      }
      return _inRange(str.length, start, end + 1);
    });
  };

  module.exports = function(opts) {
    var filteredCorpus, hash, hashStr, random, randomStr, tokensFromString, _options;
    if (opts == null) {
      opts = {};
    }
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
    tokensFromString = function(hash, opts) {
      var corpusKeys, options;
      if (opts == null) {
        opts = {};
      }
      options = _defaults(opts, {
        strPattern: _options.strPattern,
        wordLength: _options.wordLength
      });
      corpusKeys = options.strPattern.split(' ');
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
    hash = function(input, salt, options) {
      var inputHash;
      if (salt == null) {
        salt = _options.salt;
      }
      if (options == null) {
        options = {};
      }
      inputHash = md5(salt + input);
      return tokensFromString(inputHash, options);
    };
    random = function(input, options) {
      var inputHash;
      inputHash = md5('' + _options.salt + Math.random() + Math.random());
      return tokensFromString(inputHash, options);
    };
    hashStr = function(input, options) {
      return hash(input, options).join(' ');
    };
    randomStr = function(input, options) {
      return random(input, options).join(' ');
    };
    return {
      hash: hash,
      hashStr: hashStr,
      random: random,
      randomStr: randomStr,
      _options: _options
    };
  };

}).call(this);
