const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateBoneInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 100, max: 1000 })
    .withMessage('Bone text is required'),
  handleValidationErrors
];

module.exports = validateBoneInput;