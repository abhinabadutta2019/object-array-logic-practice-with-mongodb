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

//$elemMatch is a MongoDB query operator that allows you to match documents that contain an array of values that match specific criteria. In other words, it allows you to find documents where one or more elements of an array match the specified condition(s). It is used when you want to match an array of values with multiple conditions, as it returns only the first matching element.

//
router.get("/ageAndScore", async (req, res) => {
  try {
    const result = await User.find({
      age: { $gt: 50 },
      grades: {
        $elemMatch: {
          subject: "Subject 1",
          score: { $gt: 90 },
        },
      },
    });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// Write a query to retrieve all documents where the score in subject 1 is greater than 90.
//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    //
    let filteredUsers = [];
    //
    allUsers.forEach((user) => {
      //
      if (user.age > 50) {
        //"State 7"--if statement ta deoa-- just data kom dekhar jonno
        user.grades.forEach((grade) => {
          //
          if (grade.subject === "Subject 1" && grade.score >= 90) {
            // console.log(grade.score);
            //
            console.log(grade);
            //
            filteredUsers.push(user);
          }
        });
      }
    });
    //
    console.log(filteredUsers);
    //
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
