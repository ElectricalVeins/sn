const io = require('socket.io');
const server = require('./startHTTP');

const cors = {
  origin: 'http://localhost:5000',
};

const socket = io(server, { cors }).on('connection', socket => {
  console.log('\nuser connected \n', socket.handshake.time, '\n');
  socket.on('disconnect', reason => {
    console.log('user disconnected', reason);
  });
});

module.exports = socket;
