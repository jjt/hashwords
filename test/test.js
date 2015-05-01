var input = 'test@test.com',
    hashwords = require('../'),
    salt = "saltysalt111",
    hw = hashwords(),
    hwSalt = hashwords({salt: salt})
    hwLength = hashwords({wordLength: [3,7]}),
    results = [
      "hw = hashwords()",
      "salt = 'saltysalt111'",
      "hwSalt = hashwords({salt: salt})",
      "hwLength = hashwords({wordLength: [3,7]})",
      "input = " + input,
      ' ',
      "hw.hash(input): [" + hw.hash(input) + "]",
      "hw.hashStr(input): " + hw.hashStr(input),
      "random(): [" + hw.random() + "]",
      "randomStr(): " + hw.randomStr(),
      ' ',
      "hwSalt.hash(input): [" + hwSalt.hash(input, salt) + "]",
      "hwLength.hashStr(input): " + hwLength.hashStr(input),
      "hwLength.randomStr(input): "+ hwLength.randomStr(input),
    ];

console.log(results.join("\n"));
