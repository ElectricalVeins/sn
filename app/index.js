const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

/* Bad Error Handler */
app.use((err, req, res, next) => {
  return res.status(500).send(err);
});

module.exports = app;
