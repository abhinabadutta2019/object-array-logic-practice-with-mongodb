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
      // Which state has the highest average score across all subjects
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $group: {
          _id: "$address.city",
          getAvg: { $avg: "$grades.score" },
        },
      },
      {
        $sort: {
          getAvg: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test1", async (req, res) => {
  try {
    // Which state has the highest average score across all subjects
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          _id: "$address.city",
          totalScore: {
            $sum: "$grades.score",
          },
          totalStudents: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          state: "$_id",
          averageScore: {
            $divide: ["$totalScore", "$totalStudents"],
          },
        },
      },
      {
        $sort: {
          averageScore: -1,
        },
      },
      {
        $limit: 1,
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
