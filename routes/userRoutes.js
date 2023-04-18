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
//age is 67
//aggrigation -match-
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([{ $match: { age: 67 } }]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//aggrigation group
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([{ $group: { _id: "$age" } }]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//group -age --then expression -name
router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $group: { _id: "$age", names: { $push: "$name" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// {
//   "_id": 53,
//   "names": [
//       "Person 16",
//       "Person 23"
//   ]
// }

//
//group -age --then expression -full document/$$ROOT
router.get("/test4", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $group: { _id: "$age", fullDocU: { $push: "$$ROOT" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
//first match then grounp then sort
router.get("/test5", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //match by address.state
      // { $match: { "address.state": "State 14" } },

      //match by age from 19-24
      { $match: { age: { $gt: 18, $lt: 25 } } },
      //then group by address.state
      { $group: { _id: "$address.state", tataiCount: { $sum: 1 } } },
      //sort
      {
        $sort: {
          tataiCount: -1,
        },
      },
      //tried to find max of that tatai count
      { $group: { _id: "$age", maxTataiCount: { $max: "$tataiCount" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//unwind and then group example
router.get("/test6", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //first unwind
      { $unwind: "$grades" },
      //second group
      // { $group: { _id: "$age", grades: { $push: "$grades" } } },
      { $group: { _id: "$grades", count: { $sum: 1 } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//find avarage age of all
router.get("/test7", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $group: { _id: null, avarageAge: { $avg: "$age" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
//total number of items in all grades array combined
router.get("/test8", async (req, res) => {
  try {
    //using unwind and then group

    // const allUsers = await User.aggregate([
    //   { $unwind: "$grades" },
    //   { $group: { _id: null, count: { $sum: 1 } } },
    // ]);

    //no need to unwind here

    const allUsers = await User.aggregate([
      { $group: { _id: null, count: { $sum: { $size: "$grades" } } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//filter
//if age is grater less than 25, give the avarage of all score
router.get("/test9", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $match: { age: { $lt: 25 } } },
      { $unwind: "$grades" },
      { $group: { _id: null, totalScore: { $avg: "$grades.score" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test10", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //first unwind
      { $unwind: "$grades" },
      { $group: { _id: null, allSubjects: { $addToSet: "$grades" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
