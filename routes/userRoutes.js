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

//find user if age is more than 67 and state is 3
router.get("/test1", async (req, res) => {
  try {
    const users = await User.find({
      age: { $gt: 67 },
      "address.state": "State 3",
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});
//find user if age is more than 67 and state is 3 and score in subject 1 is more than 35
router.get("/test2", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { age: { $gt: 27 } },
        { "address.state": "State 3" },
        {
          grades: { $elemMatch: { subject: "Subject 1", score: { $gt: 35 } } },
        },
      ],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//find user if state is 3, Subject 1 score grater than 55 and subject 2 score grater than 50
router.get("/test3", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { "address.state": "State 3" },
        {
          grades: { $elemMatch: { subject: "Subject 1", score: { $gt: 55 } } },
        },
        {
          grades: { $elemMatch: { subject: "Subject 2", score: { $gt: 50 } } },
        },
      ],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//2. find user if state is 3, Subject 1 score less than 11 OR subject 2 score grater than 90
router.get("/test4", async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { "address.state": "State 3" },
        {
          $or: [
            {
              grades: {
                $elemMatch: { subject: "Subject 1", score: { $lt: 11 } },
              },
            },
            {
              grades: {
                $elemMatch: { subject: "Subject 2", score: { $gt: 90 } },
              },
            },
          ],
        },
      ],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//To find a user if the state is 3 and the score in any subject is less than 10, we can use the following query:
router.get("/test5", async (req, res) => {
  try {
    const users = await User.find({
      $and: [{ "address.state": "State 3" }, { "grades.score": { $lt: 3 } }],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//To find a user if the state is 33( acctuly no state 33) or the score in any subject is grater than 99
router.get("/test6", async (req, res) => {
  try {
    const users = await User.find({
      $or: [{ "address.state": "State 33" }, { "grades.score": { $gt: 99 } }],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});
//
module.exports = router;
