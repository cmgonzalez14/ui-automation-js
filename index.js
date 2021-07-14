var path = require('path');
var uuid = require('uuid');
var axios = require('axios');
var cryptoJS = require('crypto-js');
var browser = require('./util/browser');
var logger = require('./util/logger');
var constant = require('./util/constant');

module.exports = {
    path: path,
    uuid: uuid,
    axios: axios,
    cryptoJS: cryptoJS,
    browser: new browser(),
    logger: logger,
    constant: new constant(),
};
