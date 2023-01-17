const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLikeInput = [
  check('liker')
    .exists({ checkFalsy: true }),
    // .uniqueness({ scope: ['user', 'skeleton'] })
  handleValidationErrors
];

module.exports = validateLikeInput;