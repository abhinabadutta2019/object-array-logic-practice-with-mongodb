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
      if (user.address.state === "State 7") {
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
