const { body, validationResult } = require('express-validator');

/**
 * Account Validation Rules
 */

/**
 * Brand Validation Rules
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 * @returns Array with errors if eny
 */
const validateRules = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors
    .array()
    .map((error) => ({ [error.path]: error.msg }));
  return res.status(422).json({ errors });
};

module.exports = {
  validateRules,
};
