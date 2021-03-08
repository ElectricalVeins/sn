const express = require('express');
const cors = require('cors');
const router = require('../routes');
const { STATIC_FILES_DEST } = require('../config');
const errorHandlers = require('../middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_FILES_DEST));
app.use('/api', router);

/* Bad Error Handlers */
app.use(errorHandlers.handleValidationError);
app.use(errorHandlers.handleSequelizeError);
app.use(errorHandlers.handleAuthError);
app.use(errorHandlers.handleApplicationError);

app.use((err, req, res, next) => {
  console.log('ERROR HANDLER =>', err);
  return res.status(500).send(err.message);
});

module.exports = app;
