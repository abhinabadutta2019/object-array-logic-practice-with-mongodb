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
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
//////////////////////////////////
//
//solve-by gpt-How many people have a score of 50 or higher in "Subject 4" or "Subject 5"-
// {
//   $unwind: {
//     path: "$grades",
//   },
// },
// {
//   $match: {
//     $and: [
//       { "grades.score": { $gte: 50 } },
//       {
//         $or: [
//           { "grades.subject": "Subject 1" },
//           { "grades.subject": "Subject 2" },
//         ],
//       },
//     ],
//   },
// },
// {
//   $group: {
//     _id: "$name",
//     count: { $sum: 1 },
//   },
// },
// {
//   $group: {
//     _id: null,
//     uniqueCount: { $sum: 1 },
//   },
// },

//////////////////////////////////////
//
//How many people have a score of 50 or higher in "Subject 4" or "Subject 5"
//done by me-
// {
//   $unwind: {
//     path: "$grades",
//   },
// },
// {
//   $match: {
//     $and: [
//       { "grades.score": { $gt: 49 } },
//       {
//         $or: [
//           { "grades.subject": "Subject 1" },
//           { "grades.subject": "Subject 2" },
//         ],
//       },
//     ],
//   },
// },
// {
//   $group: {
//     _id: "$name",
//   },
// },
// {
//   $count: "count",
// },
///////////////////////////////////
//
// What is the average score of people living in each city across all subjects?

//my solve

// {
//   $unwind: {
//     path: "$grades",
//   },
// },
// {
//   $group: {
//     _id: "$address.city",
//     getAvg: { $avg: "$grades.score" },
//   },
// },
//////////////////////
//
// What is the average score of people living in each city across all subjects?

//chat gpt solve

// {
//   $unwind: {
//     path: "$grades",
//   },
// },
// {
//   $group: {
//     _id: { city: "$address.city" },
//     totalSum: { $sum: "$grades.score" },
//     totalStudent: { $sum: 1 },
//   },
// },
// {
//   $project: {
//     _id: 0,
//     city: "$_id.city",
//     avarageScore: {
//       $divide: ["$totalSum", "$totalStudent"],
//     },
//   },
// },
//The _id field is set to 0 to exclude it from the output.
//The city field is extracted from the _id field using the dot notation.
//////////////////////////
