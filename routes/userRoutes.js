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
    const allUsers = await User.aggregate([
      // What is the highest score achieved by a person living in a city with a population between 3 and 6?
      //first try to find total population in a city
      //eta korle kon city gulo ----seta paoa jacche
      {
        $group: {
          _id: "$address.city",
          totalPeople: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          totalPeople: { $gt: 2, $lt: 7 },
        },
      },
      //eta korle array of object e reply asche
      // {
      //   $project: {
      //     _id: 0,
      //     totalPeople: { $push: "$_id" },
      //   },
      // },
      //
      //eta korle array te reply asche
      {
        $group: {
          _id: null,
          totalPeople: { $push: "$_id" },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//wrong logic
//eta korle unwind hoye jaoa er jonno --- prottekta --- user k 5 bar kore dhorche

router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $group: {
          _id: "$address.city",
          totalPeople: {
            $sum: 1,
          },
        },
      },
      // {
      //   $group: {
      //     _id: null,
      //     totalPopulation: { $sum: "$totalPeople" },
      //   },
      // },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//this is correct answer - 2 bar aggrigate method use kore answer elo
router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $group: {
          _id: "$address.city",
          totalPeople: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          totalPeople: { $gt: 2, $lt: 7 },
        },
      },

      {
        $group: {
          _id: null,
          totalPeople: { $push: "$_id" },
        },
      },
    ]);
    //uporer aggregation er result theke pelam
    // extract the array of city names
    const cityNames = allUsers[0].totalPeople;
    //
    const highestScore = await User.aggregate([
      {
        $match: {
          "address.city": { $in: cityNames },
        },
      },
      {
        $unwind: "$grades",
      },
      {
        $group: {
          _id: "$address.city",
          highestScore: {
            $max: "$grades.score",
          },
        },
      },
    ]);
    res.send(highestScore);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
