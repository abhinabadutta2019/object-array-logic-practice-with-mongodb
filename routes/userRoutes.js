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

// first metch then group example
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      { $match: { age: 48 } },
      { $group: { _id: "$address.state", total: { $sum: 1 } } },
    ]);
    //age wise match kore -sei age e kotojon ache
    // await User.aggregate([
    //   { $match: { age: { $gt: 24, $lt: 30 } } },
    //   { $group: { _id: "$age", total: { $sum: 1 } } },
    // ]);
    // await User.aggregate([
    //   { $match: { age: 48 } },
    //   { $group: { _id: "$address.state", total: { $sum: 1 } } },
    // ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //$unwind: Unwind an array field and create a new document for each element in the array
      // Example: Unwind the "grades" array and get a separate document for each grade, then match for subject 1

      {
        $unwind: "$grades",
      },
      {
        $match: {
          "grades.subject": "Subject 1",
        },
      },

      //
      //$limit: Limit the number of documents returned in the result set
      // Example: Get only the first two documents from the collection
      // {
      //   $match: {
      //     "address.state": "State 14",
      //   },
      // },
      // {
      //   $limit: 2,
      // },
      // $project: Select specific fields from documents and rename them if necessary
      // Example: Select only the "name" and "address.city" fields, and rename "address.city" to "city"
      //
      // {
      //   $project: {
      //     _id: 0,
      //     name: 1,
      //     city: "$address.city",
      //   },
      // },
      //// Example: Sort documents by "age" field in descending order
      // {
      //   $sort: {
      //     age: -1,
      //   },
      // },
      //// Example: Group documents by "address.city" field and get the total count of documents in each city
      // {
      //   $group: {
      //     _id: "$address.city",
      //     count: { $sum: 1 },
      //   },
      // },
      ////$match: Filter documents by a specific condition
      // Example: Get all documents where the "age" field is greater than or equal to 35, less than equal to 40
      // {
      //   $match: {
      //     age: { $gte: 35, $lte: 40 },
      //   },
      // },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
