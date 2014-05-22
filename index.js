hashwords = require('./lib/hashwords'); 
if(typeof window != null)
  window.hashwords = hashwords
else
  module.exports = hashwords
