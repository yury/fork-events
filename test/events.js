var Lab = require('lab');
var Code = require('code');
var ForkEvents = require('../lib');

var lab = exports.lab = Lab.script();
var expect = Code.expect;

lab.experiment('ForkEvents', function() {

  lab.test('create fork', function(done) {
    var fork = ForkEvents.fork('test/process');
    fork.on('start', function() {
      console.log('nice');
    });
    done();
  });

});
