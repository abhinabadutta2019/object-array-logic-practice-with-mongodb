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
router.get("/mongo", async (req, res) => {
  try {
    const result = await User.find({
      grades: {
        $elemMatch: {
          subject: "Subject 2",
          score: { $lte: 50 },
        },
      },
    });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// Write a query to retrieve all documents where the score in subject 2 is less than or equal to 50.
//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    //
    filterArray = [];
    //

    allUsers.map(function (user) {
      if (user.grades[1].score <= 50) {
        filterArray.push(user);
      }
    });

    res.send(filterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
