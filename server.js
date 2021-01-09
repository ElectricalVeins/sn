require('dotenv').config();
const http = require('http');
const app = require('./app');
const { PORT } = require('./app/config');

const server = http.createServer(app);

server.listen(PORT, () => console.log('Server is up on', PORT));
