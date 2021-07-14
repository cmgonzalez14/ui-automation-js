
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');
var date = new Date().getTime();
var downloadFolder = path.join(process.cwd(), '/downloads/');

exports.config = {
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine',
  specs: [
    '../tests/*.js'
  ],
  suites: {
    smoke: [
      '../test/smoke/smoke.js',
    ],
  },
  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 120000
  },
  onPrepare: function () {
    let globals = require('protractor');
    let browser = globals.browser;
    const fs = require('fs');
    const path = require('path');
    const directory = downloadFolder;
    fs.readdir(directory, (err, files) => {
      if (err) { throw err; }
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) { throw err; }
        });
      }
    });
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(10000);
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: `reports/${date}`
    }).getJasmine2Reporter());
  },
};