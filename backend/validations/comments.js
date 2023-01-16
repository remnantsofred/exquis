const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: true })
    .withMessage('Comment text is required'),
  handleValidationErrors
];

module.exports = validateCommentInput;