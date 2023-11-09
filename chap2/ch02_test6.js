var nconf = require('nconf');
nconf.env();

console.log('OS environment variable values: %s', nconf.get('OS'));