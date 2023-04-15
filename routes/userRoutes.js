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

// Write a query to find all the users who live in state "State 5".

//
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    //
    let filterUser = [];
    //
    allUsers.map(function (user) {
      if (user.address.state === "State 7") {
        filterUser.push(user);
      }
    });
    //
    console.log(filterUser.length);
    //
    res.send(filterUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
