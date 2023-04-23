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
          //working
          sumMarksSubjects: { $sum: "$thoseSubjects" },
          //working 1
          // avgMarksSubjects1: { $avg: "$thoseSubjects" },
          // //working 2
          // maxMarksSubjects2: { $max: "$thoseSubjects" },
          //
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//sort - this not giving result
router.get("/test1", async (req, res) => {
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
      // {
      //   $project: {
      //     _id: 0,
      //     // input: "$thoseSubjects",
      //     // sortBy: 1,
      //     //its giving result- but not sorting
      //     // pSubjects: { input: "$thoseSubjects", sortBy: 1 },
      //   },
      // },

      //
      // {
      //   $sortArray: { input: "$thoseSubjects", sortBy: 1 },
      // },

      //
      { $sort: { thoseSubjects: -1 } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//this working -- but no point to push to array
//sort korar bepare unwind kore sort korte holo
router.get("/test2", async (req, res) => {
  //gets all user age $lte  25
  try {
    const allUsers = await User.aggregate([
      { $unwind: "$grades" },
      { $match: { "address.zip": /^5/ } },
      {
        $group: {
          _id: "random",
          thoseSubjects: { $push: "$grades.score" },
        },
      },
      { $unwind: "$thoseSubjects" },
      { $sort: { thoseSubjects: -1 } },
      {
        $group: {
          _id: "$_id",
          thoseSubjects: { $push: "$thoseSubjects" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
