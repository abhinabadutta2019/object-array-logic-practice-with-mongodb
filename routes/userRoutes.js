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
router.get("/zip", async (req, res) => {
  try {
    const result = await User.find({
      "address.zip": { $gt: 70000, $lt: 80000 },
    });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
// Write a query to retrieve all documents where the zip code starts with "7".
//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    //
    filterArray = [];
    //
    allUsers.map(function (user) {
      if (user.address.zip[0] === "7") {
        filterArray.push(user);
      }
    });
    //
    res.send(filterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
