const log4js = require('log4js');
var date = new Date().getTime();

function getLogger(filename) {
    return log4js.getLogger(filename);
}

function setLogger(level='info') {
    return log4js.configure({
        appenders: { file: { type: 'file', filename: `logs/${date}.log` } },
        categories: { default: { appenders: ['file'], level: level } }
    });
}

module.exports = { getLogger, setLogger };
