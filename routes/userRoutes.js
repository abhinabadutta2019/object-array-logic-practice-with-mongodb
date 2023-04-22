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
      {
        $unwind: "$grades",
      },
      {
        $group: {
          //eta constant bole -- 1ta object e result asche
          _id: "randomID",
          sumScores: { $sum: "$grades.score" },
          maxScore: { $max: "$grades.score" },
          minScores: { $min: "$grades.score" },
          avgScore: { $avg: "$grades.score" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          //eta variable bole prottekta $name variable wise result asche- $name 200 ta bole total 200 ta result asche
          _id: "$name",
          sumScores: { $sum: "$grades.score" },
          maxScore: { $max: "$grades.score" },
          minScores: { $min: "$grades.score" },
          avgScore: { $avg: "$grades.score" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          //eta age wise segment kore total 48 ta result asche
          _id: "$age",
          sumScores: { $sum: "$grades.score" },
          maxScore: { $max: "$grades.score" },
          minScores: { $min: "$grades.score" },
          avgScore: { $avg: "$grades.score" },
        },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $group: {
          //etai array nei bole $unwind er dorkar nei
          //eta $address.state wise segment kore total 49 ta result asche
          _id: "$address.city",
          // sumScores: { $sum: "$grades.score" },
          // maxScore: { $max: "$grades.score" },
          // minScores: { $min: "$grades.score" },
          // avgScore: { $avg: "$grades.score" },
          //
          count: { $sum: 1 },
          //count 1 kora mane --- total kota oita royeche -- ekhane- address.state
          //eta $address.state wise segment kore total 49 ta result asche
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      // {
      //   $unwind: "$grades",
      // },
      {
        $group: {
          //eta $address.state wise segment kore total 20 ta result asche
          _id: "$address.state",

          //ei part ta etai dorkar nei
          // sumScores: { $sum: "$grades.score" },
          // maxScore: { $max: "$grades.score" },
          // minScores: { $min: "$grades.score" },
          // avgScore: { $avg: "$grades.score" },
          //
          counter: { $sum: 1 },
        },
      },

      //eta korle total kota $address.state ache paoa jabe - 200 ta paoar kotha
      //
      // {
      //   $group: {
      //     _id: "randomID",
      //     count: { $sum: "$counter" },
      //   },
      //
      // },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
