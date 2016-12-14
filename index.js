var hashwords = require('./lib/hashwords'); 
if(typeof window !== 'undefined')
  window.hashwords = hashwords;
else
  module.exports = hashwords;
