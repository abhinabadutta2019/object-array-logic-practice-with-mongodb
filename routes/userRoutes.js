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
  //gets all user age $lte  25
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
      //after unwind group with same name/_id
      //( in some cases-- username, email---mainly jei  array ke--unwind kora hoyeche --  )

      //eta korle prottekta individual _id er -- joto gulo field -- seta dekhabe
      {
        $group: { _id: "$name", counter: { $sum: 1 } },
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
      //unwind
      {
        $unwind: "$grades",
      },
      //grades less than 20
      { $match: { "grades.score": { $lte: 30 } } },

      //prottek er same object te dhukche

      {
        $group: {
          _id: "random",
          //eta theke max Age^^^ among all^^^^^^^^^^^^^^^^^
          minAge: { $max: "$age" },
          //eta theke avarage score
          avgScore: { $avg: "$grades.score" },
          //
          sumScores: { $sum: "$grades.score" },
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
        $group: { _id: "$name", thoseSubjects: { $push: "$grades" } },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },
      //grades less than 20
      { $match: { "grades.score": { $lte: 30 } } },
      //eta mane individual name- joto gulo score - ex context e -- $lte 30
      // {
      //   $group: { _id: "$name", counter: { $sum: 1 } },
      // },
      //
      //prottek er individual array te dhukche
      {
        $group: { _id: "$name", thoseSubjects: { $push: "$grades" } },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//match e duto condition
router.get("/test4", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },
      //grades less than 20
      { $match: { "grades.score": { $lte: 30 } } },

      //
      //prottek er same array te dhukche
      {
        $group: { _id: "random", thoseSubjects: { $push: "$grades" } },
      },
      //array er upor group chalano jacche naa
      //this part not working
      // {
      //   $group: { _id: null, "$thoseSubjects.score": { $max: "$grades" } },
      // },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test5", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },

      // group
      {
        $group: {
          _id: "$name",

          //
          sumScores: { $sum: "$grades.score" },
          //
          individulalHighest: { $max: "$grades.score" },
          //
          individulalLowest: { $min: "$grades.score" },
        },
      },
      //highest total among all, also the order
      {
        $sort: {
          sumScores: -1,
        },
      },
      // eta limit kore dile sudhi ekta dekhabe
      // {
      //   $limit: 1,
      // },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test6", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind
      {
        $unwind: "$grades",
      },
      // random( all together)--- so
      {
        $group: {
          _id: "random",

          //
          sumScores: { $sum: "$grades.score" },
          //
          individulalHighest: { $max: "$grades.score" },
          //
          individulalLowest: { $min: "$grades.score" },
        },
      },

      //
      //project diye sudhu dekhano hocche
      {
        $project: {
          _id: 0,
          sumScores: 1,
        },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
