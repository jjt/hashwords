
# animalonymous

Takes input strings and hashes them to output strings of the form "[adjective]
[animal]". Intended to provide anonymous, (semi-)persistent usernames.

### Install
    $> npm install --save animalonymous

### Usage:
```
var input = 'test@animalonymous.com',
    anml = require('../'),
    salt = "saltysalt111",
    results = [
      "input: " + input,
      "hash(input): [" + anml.hash(input) + "]",
      "hash(input, \"saltysalt111\"): [" + anml.hash(input, salt) + "]",
      "hashStr(input): " + anml.hashStr(input),
      "random(): [" + anml.random() + "]",
      "randomStr(): " + anml.randomStr()
    ];

console.log(results.join("\n"));

// Console Output
// input: test@animalonymous.com
// hash(input): [Upset,Camel]
// hash(input, "saltysalt111"): [Cheap,Wildebeest]
// hashStr(input): Upset Camel
// random(): [Moist,Salamander]
// randomStr(): Cultured Galapagos Tortoise

```

### Details

We have two source arrays comprised of 591 animals and 1344 adjectives which get
combined for a total of 794,304 unique outputs.
The main function in `animalonymous` takes an md5 hash of the input, then
converts the first 8 bytes to a 32-bit integer for selecting the animals, and
then the next 8 bytes of the hash to a 32-bit integer for the adjectives. It
then takes these integers and determines indexes for each array by `floor( (int
/ 2^32) * len )`. It then returns `animals[animalsIndex] + " "
+adjectives[adjectivesIndex]`.

## License 

(The MIT License)

Copyright (c) 2013 jason@jasontrill.com <Jason Trill>;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
