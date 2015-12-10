var async = require('async');

module.exports = sendAll;

function sendAll(msg, cb) {
  async.map(msg, function(msg, cb) {
    console.log('sending message %j', msg); // TODO: REMOVE CONSOLE LOG
    cb(null, randomResult());
    //return msg + ' hello';
  }, function(err, res) {
    console.log( 'haha', res); // TODO: REMOVE CONSOLE LOG
  });
}

function send(msg, cb) {
  console.log('sending message %j', msg); // TODO: REMOVE CONSOLE LOG
  setTimeout(cb, randomTimeout(), null, randomResult());
}

function randomTimeout() {
  return Math.floor(Math.random() * 1e3);
}

function randomResult() {
  return Math.floor(Math.random() * 1e10);
}
