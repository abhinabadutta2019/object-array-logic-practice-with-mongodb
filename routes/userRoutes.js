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

//if age more than 67
//

router.get("/test", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      $expr: {
        $gt: ["$age", 67],
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Here's an example of a query to retrieve all documents where the score in subject 1 is greater than 90, inside a route:
router.get("/test1", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      grades: {
        $elemMatch: {
          subject: "Subject 3",
          score: { $gt: 90 },
        },
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a query to retrieve all documents where age is grater than 63 but less than 67
router.get("/test2", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      age: {
        $gt: 63,
        $lt: 67,
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//with $expr Write a query to retrieve all documents where age is grater than 63 but less than 67
router.get("/test3", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      $expr: {
        $and: [{ $gt: ["$age", 63] }, { $lt: ["$age", 67] }],
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a query to retrieve all documents where the zip code starts with "7"
router.get("/test4", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      $expr: {
        $eq: [{ $substr: ["$address.zip", 0, 1] }, "7"],
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a query to retrieve all documents where the zip code starts with "7"
router.get("/test5", async (req, res) => {
  try {
    const filteredUsers = await User.find({
      "address.zip": {
        $regex: "^7",
      },
    });
    res.send(filteredUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

////Write a query to retrieve all documents where the zip code starts with 1 to 3
router.get("/test6", async (req, res) => {
  try {
    const filteredDocuments = await User.find({
      "address.zip": { $regex: /^[1-3]/ },
    });
    res.send(filteredDocuments);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Here's an example of a route that retrieves all documents where the score in subject 4 is from 85 to 95 using

router.get("/test7", async (req, res) => {
  try {
    const result = await User.find({
      grades: {
        $elemMatch: {
          subject: "Subject 4",
          score: { $gte: 85, $lte: 95 },
        },
      },
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test8", async (req, res) => {
  try {
    const subject4Score = await User.find({
      $expr: {
        $and: [
          { $gte: ["$grades.score", 85] },
          { $lte: ["$grades.score", 95] },
        ],
      },
      "grades.subject": "Subject 4",
    });
    res.send(subject4Score);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
