const { check } = require("express-validator");
const Skeleton = require("../models/Skeleton");
const handleValidationErrors = require('./handleValidationErrors');


//update skeleton validations (num collaborators, length, etc)
const validateSkeletonInput = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Skeleton title is required'),
  check('maxBones')
    .isFloat({ min: 5, max: 50 })
    .withMessage('Skeleton should have at least 5 bones and no more than 50 bones'),
    // this was causing issues. Not sure .isFloat is correct
  // check('maxCollabrators')
  //   .isFloat({ min: 2, max: 10 })
  //   .withMessage('Skeleton should have at least 2 collaborators and no more than 10 collaborators'),
  handleValidationErrors
];



module.exports = validateSkeletonInput;