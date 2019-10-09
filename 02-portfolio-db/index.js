require = require('esm')(module);

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';

module.exports = require ('./main.js');