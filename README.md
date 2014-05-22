# HASHWORDS

Takes input strings and hashes them to output strings or arrays of the form "[adjective]
[noun] [noun]". Intended to provide anonymous, persistent usernames.

### Install for Node.js
    $> npm install --save hashwords

### Install for the Browser
    $ bower install --save hashwords

Bower is prefered, but you can also [download a release manually](https://github.com/jjt/hashwords/releases).

### Usage:
```
// Node.js:
// var hashwords = require('hashwords');

// Browser:
// <script src="path/to/hashwords.min.js"></script>
 
var hw = hashwords(),
    salt = 'saltysalt111',
    hwSalt = hashwords({salt: salt}),
    input = 'test@test.com';

hw.hash(input);
// ['Rundown', 'Job', 'Snake'] 

hw.hashStr(input);
// 'Rundown Job Snake'

hwSalt.hashStr(input);
// 'Annual Lobby District'

hw.random();
// Something like
// ['Enormous', 'Baby', 'Slice']

hw.randomStr();
// Something like
// 'Plain Shirt Facility'
```
