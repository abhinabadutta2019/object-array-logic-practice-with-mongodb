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
    let filterUser = [];
    //
    allUsers.map(function (user) {
      //
      if (user.address.state === "State 7") {
        //"State 7"--if statement ta deoa-- just data kom dekhar jonno
        for (let index = 0; index < user.grades.length; index++) {
          //
          if (
            user.grades[index].subject === "Subject 1" &&
            user.grades[index].score >= 90
          ) {
            // console.log(user.grades[index].score);
            //
            console.log(user.grades[index]);
            //
            filterUser.push(user);
          }
        }
      }
    });
    //
    console.log(filterUser);
    //
    res.send(filterUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
