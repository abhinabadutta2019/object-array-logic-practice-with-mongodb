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

router.get("/test", async (req, res) => {
  //gets all user age $lte  25
  try {
    const allUsers = await User.aggregate([
      // {
      //   $unwind: "$grades",
      // },

      {
        $match: { age: { $lte: 25 } },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind diye array related example
      //jotogulo grade score lessthan equal to 20--- same user er repeat hochhe- jeta group kore -- unique user bar kora jabe
      {
        $unwind: "$grades",
      },

      {
        $match: { "grades.score": { $lte: 20 } },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//
router.get("/test2", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind diye array related example

      {
        $unwind: "$grades",
      },
      //sob user er "Subject 1" er value asche
      {
        $match: { "grades.subject": "Subject 1" },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//match e duto condition
router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //unwind diye array related example

      {
        $unwind: "$grades",
      },

      {
        $match: {
          "grades.subject": "Subject 1",
          //sob user , jader score  "Subject 1" e 20 er kom
          "grades.score": { $lte: 20 },
        },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test4", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      //object related / array related noi tai -- unwind lagche naa
      // {
      //   $unwind: "$grades",
      // },
      //match kora hocche zip $gte: "50000", $lte: "70000"--
      {
        $match: { "address.zip": { $gte: "50000", $lte: "70000" } },
      },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
