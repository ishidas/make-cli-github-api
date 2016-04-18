exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  specs: [__dirname + '/test/e2e/*.js'],
  jasmineNodeOpts: {
    showColors: true  
  }
}
