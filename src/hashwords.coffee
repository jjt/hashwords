md5 = require('./md5').md5
adjectives = require('./adjectives')
nouns = require('./nouns')


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


module.exports = (opts = {})->
  salt = opts.salt or ''
  strPattern = opts.strPattern or "adj noun noun"
  corpus = opts.corpus or noun: nouns, adj: adjectives

  tokensFromString = (hash, pattern = strPattern) ->
    corpusKeys = pattern.split ' '
    # We need 8 hex chars per token, so make sure hash is long enough
    while hash.length < corpusKeys.length * 8
      hash += md5 hash
    corpusKeys.map (key, index)->
        upperFirst arrayElFromInt corpus[key], intFromHexStr(hash, index)
    
  hash = (input) ->
    # Get md5 of input
    inputHash = md5(salt + input)
    tokensFromString inputHash

  random = (input) ->
    inputHash = md5 '' + salt + Math.random() + Math.random()
    tokensFromString inputHash

  hashStr = (input) ->
    hash(input).join ' '

  randomStr = (input) ->
    random(input).join ' '

  { hash, hashStr, random, randomStr, corpus, salt}
