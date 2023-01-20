const { check } = require("express-validator");
const Skeleton = require("../models/Skeleton");
const handleValidationErrors = require('./handleValidationErrors');


//update skeleton validations (num collaborators, length, etc)
const validateSkeletonInput = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 100 })
    .withMessage('Skeleton title is required and must be between 1 and 100 characters'),
  check('prompt')
    .isLength({ min: 0, max: 150 }),
  check('maxBones')
    .isFloat({ min: 5, max: 50 })
    .withMessage('Skeleton should have at least 5 bones and no more than 50 bones'),
  check('tags')
    .isLength({ min: 0, max: 30 }),
  
    // this was causing issues. Not sure .isFloat is correct
  // check('maxCollabrators')
  //   .isFloat({ min: 2, max: 10 })
  //   .withMessage('Skeleton should have at least 2 collaborators and no more than 10 collaborators'),
  handleValidationErrors
];



module.exports = validateSkeletonInput;