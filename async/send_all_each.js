var async = require('async');

module.exports = sendAll;

function sendAll(msg, cb) {
  async.each(msg, send, cb)
}

function send(msg) {
  console.log('sending message', msg); // TODO: REMOVE CONSOLE LOG
  setTimeout(function() {
    console.log('finished sending message %j', msg); // TODO: REMOVE CONSOLE LOG
  }, randomTimeout());
}

function randomTimeout() {
  return Math.floor(Math.random() * 1e3);
}
