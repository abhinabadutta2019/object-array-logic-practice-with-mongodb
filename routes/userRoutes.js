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

router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },
      //grades less than 20
      { $match: { "grades.score": { $lte: 30 } } },

      //prottek er same object te dhukche

      {
        $group: {
          //random means all together
          _id: "random",
          //eta theke max Age^^^ among all^^^^^^^^^^^^^^^^^
          minAge: { $max: "$age" },
          //eta theke avarage score
          avgScore: { $avg: "$grades.score" },
          //
          sumScores: { $sum: "$grades.score" },
        },
      },

      //project example
      //project diye field er naam change
      {
        $project: {
          youngest: "$minAge",
          গড়: "$avgScore",
        },
      },
      //
      //   [
      //     {
      //         "_id": "random",
      //         "youngest": 69,
      //         "গড়": 15.016501650165017
      //     }
      // ]
      //
      //

      //project example
      //project diye field hide kora hocche
      // ba jei field dorkar dekhano hocche
      {
        $project: {
          গড়: 1,
        },
      },
      //
      //   [
      //     {
      //         "_id": "random",
      //         "গড়": 15.016501650165017
      //     }
      // ]
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//project use kore field er name hobar por-- ---then unwind ba group...etc kora hole-- updated fieldname use hoi
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //
      {
        $project: {
          age: 1,
          grades: 1,
        },
      },
      //
      {
        $project: {
          age: "$age",
          গ্রেড: "$grades",
        },
      },
      //project er por jokhon unwind
      {
        $unwind: {
          path: "$গ্রেড",
        },
      },
      //
      {
        $group: {
          _id: "random",
          গ্রেডAvg: { $avg: "$গ্রেড.score" },
        },
      },
      //
      //   [
      //     {
      //         "_id": "random",
      //         "গ্রেডAvg": 50.791
      //     }
      // ]
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test2", async (req, res) => {
  //gets all user age $lte  25
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test3", async (req, res) => {
  //gets all user age $lte  25
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
