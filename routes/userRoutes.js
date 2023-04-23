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
//example 1
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $addFields: {
          totalScore: { $sum: "$grades.score" },
        },
      },
      //
      {
        $addFields: {
          newField: "Hello World",
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//emaxple 2
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $addFields: {
          totalHomework: { $sum: "$grades.score" },
        },
      },
      {
        $addFields: { totalScore1: ["$totalHomework", "$age"] },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
