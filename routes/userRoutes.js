const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();

//
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log(typeof allUsers);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a query to retrieve all documents where the score in at least three subjects is less than 50.
//
router.get("/threeOrMoreScoresBelow50", async (req, res) => {
  try {
    const result = await User.find({
      $expr: {
        $gt: [
          {
            $size: {
              $filter: {
                input: "$grades",
                as: "grade",
                cond: { $lt: ["$$grade.score", 50] },
              },
            },
          },
          3,
        ],
      },
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
//
router.get("/mongo", async (req, res) => {
  try {
    const result = await User.find({
      grades: { $not: { $elemMatch: { score: { $lt: 50 } } } },
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// Write a query to retrieve all documents where the score in all subjects is greater than or equal to 70.
//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    //
    filterArray = [];
    // let counter = 0;

    //
    allUsers.map(function (user) {
      let counter = 0;
      //
      user.grades.forEach((item) => {
        //
        // let counter = 0;
        // console.log(item);
        if (item.score > 70) {
          counter = counter + 1;
          console.log(counter);
          if (counter >= 4) {
            filterArray.push(user);
          }
        }
      });
    });
    res.send(filterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
