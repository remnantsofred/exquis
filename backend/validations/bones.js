const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateBoneInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 1000 })
    .withMessage('Bone text is required and must be between 100 and 1000 characters'),
  check('skeleton')
    .exists({ checkFalsy: true })
    .withMessage('Bone must belong to a skeleton'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Bone must have an author'),
  handleValidationErrors
];

module.exports = validateBoneInput;