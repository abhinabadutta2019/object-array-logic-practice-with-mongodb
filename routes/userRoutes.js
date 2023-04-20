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

// c. Get the count of persons living in each city, and sort the results by the city name in ascending order:
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $group: {
          _id: "$address.city",
          count: { $sum: 1 },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// a. Get the highest score for each subject, across all persons, and sort the results by the highest score in descending order:
// {
//   $unwind: "$grades",
// },
// {
//   $group: {
//     _id: "$grades.subject",
//     getHighest: { $max: "$grades.score" },
//   },
// },

//
//To group by state and find the highest score for each subject:
//  {
//   $unwind: "$grades",
// },
// {
//   $group: {
//     _id: { state: "$address.state", subject: "$grades.subject" },
//     getmax: { $max: "$grades.score" },
//   },
// },
// {
//   $group: {
//     _id: "$_id.state",
//     subjects: { $push: { subject: "$_id.subject", getmax: "$getmax" } },
//   },
// },
//
//  //To group by state and find the average age of people in each state:
//     // { $unwind: "$address" },
//     {
//       $group: {
//         _id: "$address.state",
//         avarageAge: { $avg: "$age" },
//       },
//     },

//c. Get the top 3 scores for each person:
// {
//   $project: {
//     name: 1,
//     _id: 1,
//     grades: { $slice: ["$grades", 3] },
//   },
// },
//// Get the average score for each subject across all persons:
// { $unwind: "$grades" },
// {
//   $group: {
//     _id: "$grades.subject",
//     total: { $avg: "$grades.score" },
//   },
// },
// // a. Get the total number of grades for each person:
// {
//   $unwind: "$grades",
// },
// { $count: "grades" },
//
//Get the highest score for each subject:
// {
//   $unwind: "$grades",
// },
// {
//   $group: {
//     _id: "$grades.subject",
//     highestScore: {
//       $max: "$grades.score",
//     },
//   },
// },
///// Filter documents by score greater than 90 and get the total count
//this correct- wrong my try-below
// { $unwind: "$grades" },
// {
//   $match: {
//     "grades.score": { $gt: 90 },
//   },
// },
// {
//   $count: "total",
// },

//wrong answer by me--although giving different result-Filter documents by score greater than 90 and get the total count:
//  {
//   $match: {
//     "grades.score": { $gt: 90 },
//   },
// },
// {
//   $group: { _id: "$age", total: { $sum: 1 } },
// },

//Group documents by city and get the average age:
// {
//   $group: {
//     _id: "$address.state",
//     avgAge: { $avg: "$age" },
//   },
// },
// //tar por sort by avgAge
// {
//   $sort: {
//     avgAge: 1,
//   },
// },
//
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
