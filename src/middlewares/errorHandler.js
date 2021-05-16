const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');
const { ValidationError: SequelizeValidationError } = require('sequelize');
const { ValidationError } = require('yup');
const { ApplicationError } = require('../utils/Errors');

module.exports.handleValidationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const {
      details: [{ message }],
    } = err;
    return res.status(400).send(message);
  }
  next(err);
};

module.exports.handleSequelizeError = (err, req, res, next) => {
  if (err instanceof SequelizeValidationError) {
    const {
      errors: [{ value, message }],
    } = err;
    return res.status(400).send(`Value "${value}" is invalid. ${message}.`);
  }
  next(err);
};

module.exports.handleAuthError = (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    const { message } = err;

    return res.status(419).send(message);
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(419).send(err.message);
  }
  next(err);
};

module.exports.handleApplicationError = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.status).send(err.message);
  }
  next(err);
};
