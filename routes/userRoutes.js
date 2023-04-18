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

//$match: Filter documents by a specific condition
// Example: Get all documents where the "age" field is greater than or equal to 35, less than equal to 40
router.get("/match", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $match: {
          age: { $gte: 35, $lte: 40 },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//$group: Group documents by a specific field and calculate an aggregate value
// Example: Group documents by "address.city" field and get the total count of documents in each city

router.get("/group", async (req, res) => {
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

//$sort: Sort documents in ascending or descending order based on a field
// Example: Sort documents by "age" field in descending order

router.get("/sort", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $sort: {
          age: -1,
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// $project: Select specific fields from documents and rename them if necessary
// Example: Select only the "name" and "address.city" fields, and rename "address.city" to "city"

router.get("/project", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          city: "$address.city",
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//$limit: Limit the number of documents returned in the result set
// Example: Get only the first two documents from the collection

router.get("/limit", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $limit: 2,
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//$skip: Skip a certain number of documents from the beginning of the result set
// Example: Skip the first two documents and return the rest

router.get("/skip", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $skip: 2,
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//$unwind: Unwind an array field and create a new document for each element in the array
// Example: Unwind the "grades" array and get a separate document for each grade

router.get("/unwind", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Group documents by city and get the average age:
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $group: {
          _id: "$address.city",
          avgAge: { $avg: "$age" },
        },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Filter documents by score greater than 90 and get the total count:
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $match: {
          "grades.score": { $gt: 90 },
        },
      },
      {
        $count: "total",
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get the highest score for each subject:
router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          _id: "$grades.subject",
          highestScore: { $max: "$grades.score" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// here are some examples of how to use nested arrays and objects in MongoDB queries:
// Examples of using nested arrays:

// a. Get the total number of grades for each person:
router.get("/random1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $project: {
          name: 1,
          num_grades: { $size: "$grades" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the average score for each subject across all persons:
router.get("/random2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          _id: "$grades.subject",
          avg_score: { $avg: "$grades.score" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//c. Get the top 3 scores for each person:

router.get("/random3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $project: {
          name: 1,
          top_3_grades: { $slice: ["$grades", 3] },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Examples of using nested objects:
// a. Get the names of all persons living in a specific city:
router.get("/random4", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $unwind: "$address" },
      { $group: { _id: "$address.city", totalPeople: { $sum: 1 } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//To group by state and find the average age of people in each state:
router.get("/random5", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $unwind: "$address" },
      { $group: { _id: "$address.state", averageAge: { $avg: "$age" } } },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//To group by state and find the highest score for each subject:

//$unwind operator is used to flatten the grades array so that each document has one grade object per document.

// $group operator is used to group the documents by state and subject and find the maximum score for each subject in each state. The _id field is set to an object with two fields - state and subject.

// Another $group operator is used to group the documents by state and create an array of objects for each state that contains the subject and maximum score for each subject.

router.get("/random6", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $unwind: "$grades" },
      {
        $group: {
          _id: { state: "$address.state", subject: "$grades.subject" },
          maxScore: { $max: "$grades.score" },
        },
      },
      {
        $group: {
          _id: "$_id.state",
          subjects: {
            $push: { subject: "$_id.subject", maxScore: "$maxScore" },
          },
        },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// here are some examples where $unwind, $group, and $sort are used together:

// a. Get the highest score for each subject, across all persons, and sort the results by the highest score in descending order:
router.get("/unwindGroupSort1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },
      {
        $group: {
          _id: "$grades.subject",
          avg_score: { $avg: "$grades.score" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// c. Get the count of persons living in each city, and sort the results by the city name in ascending order:
router.get("/unwindGroupSort2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $group: {
          _id: "$address.city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
module.exports = router;
