require('dotenv').config();
require('./boot/startWS');
const server = require('./boot/startHTTP');
const { PORT } = require('./config');

server.listen(PORT, () => console.log('Server is up on', PORT));
