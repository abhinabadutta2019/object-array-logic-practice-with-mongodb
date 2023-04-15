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

//findOne vs findOneLean--theory

// When using the findOne method in Mongoose, it returns a Mongoose document, which is a special object that wraps the plain JavaScript object returned from MongoDB and adds extra functionality like change tracking and middleware.

// However, these extra features come at a cost: Mongoose documents are heavier and slower than plain JavaScript objects, and they can cause memory problems when working with large datasets.

// In these cases, using findOne().lean() can be a better option, as it returns a plain JavaScript object instead of a Mongoose document. This can result in better performance, especially when working with large datasets, as the plain JavaScript objects are lighter and faster.
//
router.get("/compareFindOneMethods", async (req, res) => {
  try {
    // Using findOne
    const user = await User.findOne();
    console.log(user instanceof mongoose.Document); // true

    // Using findOne().lean()
    const userLean = await User.findOne().lean();
    console.log(userLean instanceof mongoose.Document); // false

    res.send("Comparison of findOne()- and findOne().lean() completed");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//This code measures the time it takes to execute findOne() and findOne().lean() and logs the results to the console. You can compare the results to see if there is a significant difference in performance

//
router.get("/performance-test", async (req, res) => {
  try {
    console.time("findOne");
    const user = await User.findOne();
    console.timeEnd("findOne");

    console.time("findOneLean");
    const userLean = await User.findOne().lean();
    console.timeEnd("findOneLean");

    res.send({
      user,
      userLean,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//findOne: 44.672ms
// findOneLean: 35.884ms

//
// In this example, we use console.time() and console.timeEnd() to measure the time it takes to execute findOne() and findOne().lean(). The results of the performance measurement will be displayed in the console.
//
module.exports = router;
