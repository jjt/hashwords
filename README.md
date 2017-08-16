# HASHWORDS

Takes input strings and hashes them to output strings or arrays of the form "[adjective]
[noun] [noun]". Intended to provide memorable hashes for users or items. Inspired by Gfycat.

### Install for Node.js
    $> npm install --save hashwords

Package managers are the preferred install method, but you can also [download a release manually](https://github.com/jjt/hashwords/releases).

### Usage:
```js
// Node.js:
// var hashwords = require('hashwords');

// Browser:
// <script src="path/to/hashwords.min.js"></script>

// To create an instance, call hashwords(options) with optional options object:
//   salt: (str)
//     Salt to apply with every call to hash/hashStr
//     default: ""
//
//   wordLength: (number | [number, number])
//     Restrict length of corpus words to exactly number or within [min, max]
//     default: false
//
//   corpus: (object)
//     Keys represent part of speech, values are [str, str, ...]
//     default: {
//       noun: ["apple", "bat", ...],
//       adj: ["airy", "beautiful", ...]
//     }

var salt = 'saltysalt111',
    input = 'test@test.com';

var hwSaltOptions = { salt: 'saltysalt111' },
    hwLengthOptions = { wordLength: [3,7] };

var hw = hashwords(),
    hwSalt = hashwords(hwSaltOptions),
    hwLength = hashwords(hwLengthOptions)

hw.hash(input);
// ['Rundown', 'Job', 'Snake']

hw.hashStr(input);
// 'Rundown Job Snake'

hw.random();
// Something like
// ['Enormous', 'Baby', 'Slice']

hw.randomStr();
// Something like
// 'Plain Shirt Facility'

hwSalt.hashStr(input);
// 'Annual Lobby District'

hwLength.hashStr(input):
// 'Second Length Staff'
```
