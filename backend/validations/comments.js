const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: true })
    .withMessage('Comment text is required'),
  check('parent')
    .exists({ checkFalsy: true })
    .withMessage('Comment must belong to a skeleton'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Comment must have an author'),
  handleValidationErrors
];

module.exports = validateCommentInput;