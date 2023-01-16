const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

//update skeleton validations (num collaborators, length, etc)
const validateSkeletonInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage('Skeleton should have at least 5 bones and no more than 50 bones'),
  handleValidationErrors
];

module.exports = validateSkeletonInput;