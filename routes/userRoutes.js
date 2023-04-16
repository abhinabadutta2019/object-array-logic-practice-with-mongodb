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

//Find all students who have a score greater than or equal to 50 in "Subject 4" and a score less than or equal to 20 in "Subject 5".
router.get("/test1", async (req, res) => {
  try {
    const students = await User.find({
      grades: {
        $elemMatch: { subject: "Subject 4", score: { $gte: 50 } },
        $elemMatch: { subject: "Subject 5", score: { $lte: 20 } },
      },
    });
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Find all users who have at least one grade with Subject 4 greater than or equal to 90.

router.get("/test2", async (req, res) => {
  try {
    const users = await User.find({
      grades: {
        $elemMatch: { subject: "Subject 4", score: { $gte: 90 } },
      },
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Find all users who have a grade with a score greater than or equal to 90 in "Subject 3" and a score less than or equal to 10 in "Subject 5".
router.get("/test3", async (req, res) => {
  try {
    const users = await User.find({
      grades: {
        $elemMatch: {
          subject: "Subject 3",
          score: { $gte: 90 },
        },
      },
      grades: {
        $elemMatch: {
          subject: "Subject 5",
          score: { $lte: 10 },
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//age grater than 67
router.get("/test4", async (req, res) => {
  try {
    const users = await User.find({ age: { $gt: 67 } });
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//Write a query to retrieve all documents where the average score in all subjects is greater than 75.
router.get("/test5", async (req, res) => {
  try {
    const result = await User.find({
      $expr: {
        $gt: [
          {
            $avg: "$grades.score",
          },
          75,
        ],
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//How to retrieve all documents where the state is "State 1"?
router.get("/test7", async (req, res) => {
  try {
    const documents = await User.find({ "address.state": "State 1" });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Write a query to find all the users who have a total score greater than 390 across all subjects.

router.get("/test8", async (req, res) => {
  try {
    const documents = await User.find({
      $expr: {
        $gt: [{ $sum: "$grades.score" }, 390],
      },
    });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//find all where state is 3 and zip starts with 7

router.get("/test9", async (req, res) => {
  try {
    const documents = await User.find({
      "address.state": "State 3",
      "address.zip": /^7/,
    });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//find all where state is 3 and zip starts with from 5 to 7

router.get("/test10", async (req, res) => {
  try {
    const documents = await User.find({
      "address.state": "State 3",
      "address.zip": { $regex: "^[5-7]" },
    });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//find all where state is 3  or 5 and zip starts with from 5 to 7
router.get("/test11", async (req, res) => {
  try {
    const documents = await User.find({
      $and: [
        {
          $or: [{ "address.state": "State 3" }, { "address.state": "State 5" }],
        },
        { "address.zip": { $regex: "^[5-7]" } },
      ],
    });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//
router.get("/test12", async (req, res) => {
  try {
    const documents = await User.find({
      $or: [{ "address.state": "State 3" }, { "address.state": "State 5" }],
      "address.zip": { $regex: "^(3|5)" },
    });
    res.send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//
module.exports = router;
