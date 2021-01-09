/* eslint-disable import/no-unresolved */
const yup = require('yup');
const { signInSchema, signUpSchema } = require('../validation');

const validateBySchema = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    req.body = await schema.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateSignIn = validateBySchema(signInSchema);
module.exports.validateSignUp = validateBySchema(signUpSchema);
