var EventEmitter = require('events').EventEmitter;
var fork = require('child_process').fork;

function ForkedProcess(cmd) {
  var self = this;
  this.reforked = false;
  EventEmitter.call(this);

  this.createProcess(cmd);

  this.refork = function() {
    self.process.kill('SIGHUP');
  };
}

ForkedProcess.prototype = new EventEmitter();

ForkedProcess.prototype.createProcess = function(cmd) {
  var self = this;
  this.process = fork(cmd, {stdio: 'inherit'});

  this.process.on('message', function(data) {
    if (data && data.event) {
      self.emit(data.event, self);
    }
  });

  this.process.on('exit', function(data) {
    self.reforked = true;
    self.createProcess(cmd);
  });
};

exports.fork = function(cmd) {
  return new ForkedProcess(cmd);
};

