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
//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      // What is the average score of people aged 25 or younger in "Subject 3"?
      //my solve
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $match: {
          "grades.subject": "Subject 3",
          age: { $lte: 25 },
        },
      },
      {
        $group: { _id: "$grades.subject", avgScore: { $avg: "$grades.score" } },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test1", async (req, res) => {
  // What is the average score of people aged 25 or younger in "Subject 3"?
  //gpt solve
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $match: {
          $and: [{ "grades.subject": "Subject 3" }, { age: { $lte: 25 } }],
        },
      },
      {
        $group: {
          _id: null,
          totalScore: {
            $sum: "$grades.score",
          },
          totalStudent: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          avarageScore: {
            $divide: ["$totalScore", "$totalStudent"],
          },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//

//
module.exports = router;
