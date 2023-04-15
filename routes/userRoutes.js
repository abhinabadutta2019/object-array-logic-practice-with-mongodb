const express = require("express");
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
router.get("/arrayLean", async (req, res) => {
  try {
    const arrayusers = await User.find().lean();

    let ageMore = [];
    //
    arrayusers.filter(function (item) {
      if (item.age > 68) {
        ageMore.push(item);
      }
    });
    //
    console.log(ageMore.length);

    //
    // console.log(ageMore);

    //
    // console.log(typeof arrayusers);
    res.send(arrayusers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//
module.exports = router;
