const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Skeleton = mongoose.model("Skeleton");
const User = mongoose.model('User');
const standardizeData = require("../../utils/standardizeData");



router.get('/', async (req, res, next) => {
    //expect query to come in as ?type=val&body=val
    try {
        const includedTypes = ["skeleton.title", "users", "skeleton.tag"]
        if (!includedTypes.includes(req.query.type)) throw req
        if (!req.query.body) return res.json({message: "Missing Body"})

        let data; 
        if (req.query.type === includedTypes[0]) {
          //queries photo based on genre, description, condition, transportation, bestTimeOfDay, and payment
          // $ "i" case insensitive 

          data = await Skeleton.find({
            $or: [
              {
                title: {
                    $regex: new RegExp(req.query.body, "i"),
                },},
                { tag: {
                    $regex: new RegExp(req.query.body, "i"),
                } },
                { username: {
                    $regex: new RegExp(req.query.body, "i"),
                } }
            ],
          });
        } else if (req.query.type === includedTypes[1]) {
            //queries User model based on username and email 
            data = await User.find({
              $or: [
                {
                  username: {
                    $regex: new RegExp(req.query.body, "i"),
                  },
                }
              ],
            }).select("_id username email createdAt updatedAt");
            
        } 
        return res.json(standardizeData(data))
    }
    catch(err) {
        const error = new Error("Search failed");
        error.statusCode = 404;
        error.errors = {
          message: `Failed to find a title, a tag, or/and user; ${err}`,
        };
        return next(error);
    }
});






module.exports = router;