// eslint-disable-next-line import/no-unresolved
const yup = require('yup');

const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/;
const passwordSchema = yup
  .string()
  .min(8)
  .max(32)
  .matches(passwordRegExp)
  .required();
const nameSchema = yup
  .string()
  .min(2)
  .max(128)
  .required();
const emailSchema = yup
  .string()
  .email()
  .required();

module.exports.signInSchema = yup.object().shape({
  email: emailSchema,
  password: yup
    .string()
    .min(8)
    .max(32)
    .required(),
});

module.exports.signUpSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required(),
  birthday: yup
    .date()
    .max(new Date())
    .required(),
  email: emailSchema,
  phone: yup
    .string()
    .matches(phoneRegExp)
    .required(),
  password: passwordSchema,
  // userRole:,
  // imageSrc:,
});
