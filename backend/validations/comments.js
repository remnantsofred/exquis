const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment text is required and must be between 1 and 1000 characters'),
  check('parent')
    .exists({ checkFalsy: true })
    .withMessage('Comment must belong to a skeleton'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Comment must have an author'),
  handleValidationErrors
];

module.exports = validateCommentInput;