const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log(typeof allUsers);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },
      //match --zip that starts with -5
      {
        $match: { "address.zip": /^5/ },
      },

      //eta korle prottekta individual _id er -- thoseSubjects-array te dhukche
      {
        $group: { _id: "random", thoseSubjects: { $push: "$grades.score" } },
      },
      //
      {
        $project: {
          result: {
            $sortArray: { input: "$thoseSubjects", sortBy: -1 },
          },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//example 1
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $addFields: {
          totalScore: { $sum: "$grades.score" },
        },
      },
      //
      {
        $addFields: {
          newField: "Hello World",
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//emaxple 2
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $match: {
          age: {
            $gt: 24,
            $lt: 30,
          },
        },
      },
      {
        $group: {
          _id: "$age",
          counter: {
            $sum: 1,
          },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
