const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLikeInput = [
  check('liker')
    .exists({ checkFalsy: true }),
  check('skeleton')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => { 
      return Like.findOne({ liker: req.body.liker._id, skeleton: req.body.skeleton._id })
        .then(() => {
          if (like) {
            return Promise.reject('You have already liked this skeleton');
          }
        });
    }), 
  handleValidationErrors
];

module.exports = validateLikeInput;