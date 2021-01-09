const express = require('express');
const cors = require('cors');
const router = require('./router');
const { STATIC_FILES_DEST } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_FILES_DEST));
app.use('/api', router);

/* Bad Error Handler */
app.use((err, req, res, next) => {
  console.log('ERROR HANDLER =>', err);
  return res.status(500).send(err);
});

module.exports = app;
