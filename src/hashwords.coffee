md5 = require('./md5').md5
adjectives = require('./adjectives')
nouns = require('./nouns')

_defaults = require('lodash/defaults')
_isArray = require('lodash/isArray')
_isNumber = require('lodash/isNumber')
_inRange = require('lodash/inRange')


upperFirst = (str) ->
  return '' if str == '' or not str?
  str.charAt(0).toUpperCase() + str.slice(1)

# Takes an array, an integer and its range (max/min) and returns an element
# from the array corresponding to the integer's positon in the range
arrayElFromInt = (arr, int, intmax = Math.pow(16,8), intmin = 0) ->
  ratio = int / (intmax - intmin)
  index = Math.floor ratio * arr.length
  arr[index]

randomEl = (arr) ->
  arr[randomInt(0, arr.length-1)]

randomInt = (min, max) ->
  Math.floor(Math.random() * (max - min + 1) + min)

intFromHexStr = (hex, index=0, len=8)->
  parseInt hex.substr(index*len, len), 16

filterStrArrayByLen = (arr, len) ->
  if not (_isNumber(len) or _isArray(len))
    return arr

  arr.filter (str) ->
    if _isArray len
      [start, end] = len
    else
      start = end = len
    _inRange str.length, start, end + 1

module.exports = (opts = {})->
  _options = _defaults opts,
    salt: ''
    strPattern: "adj noun noun"
    wordLength: false
    corpus:
      noun: nouns
      adj: adjectives

  filteredCorpus = () ->

  tokensFromString = (hash, opts={}) ->
    options = _defaults opts,
      strPattern: _options.strPattern
      wordLength: _options.wordLength

    corpusKeys = options.strPattern.split ' '

    # We need 8 hex chars per token, so make sure hash is long enough
    while hash.length < corpusKeys.length * 8
      hash += md5 hash

    corpusKeys.map (key, index)->
      localCorpus = _options.corpus[key]
      if options.wordLength
        localCorpus = filterStrArrayByLen localCorpus, options.wordLength

      upperFirst arrayElFromInt localCorpus, intFromHexStr(hash, index)

  hash = (input, salt=_options.salt, options={}) ->
    # Get md5 of input
    inputHash = md5(salt + input)
    tokensFromString inputHash, options

  random = (input, options) ->
    # Double random for input length purposes
    inputHash = md5 '' + _options.salt + Math.random() + Math.random()
    tokensFromString inputHash, options

  hashStr = (input, options) ->
    hash(input, options).join ' '

  randomStr = (input, options) ->
    random(input, options).join ' '

  { hash, hashStr, random, randomStr, _options}
