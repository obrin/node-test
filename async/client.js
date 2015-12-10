var sendAll = require('./send_all_map');

var messages = ['message 1', 'message 2', 'message 3'];

sendAll(messages, function(err, res) {
  if (err) {
    console.error(err);
  }
  else {
    console.log('Done sending all messages', res); // TODO: REMOVE CONSOLE LOG
  }
});