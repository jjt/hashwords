var input = 'test@test.com',
    hashwords = require('../'),
    salt = "saltysalt111",
    hw = hashwords(),
    hwSalt = hashwords({salt: salt})
    results = [
      "hw = hashwords()",
      "salt = 'saltysalt111'",
      "hwSalt = hashwords({salt: salt})",
      "input = " + input,
      ' ',
      "hw.hash(input): [" + hw.hash(input) + "]",
      "hw.hashStr(input): " + hw.hashStr(input),
      "hwSalt.hash(input): [" + hwSalt.hash(input, salt) + "]",
      "random(): [" + hw.random() + "]",
      "randomStr(): " + hw.randomStr()
    ];

console.log(results.join("\n"));
