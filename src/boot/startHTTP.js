const { Server } = require('http');
const app = require('./startExpress');

const server = new Server(app);

module.exports = server;
