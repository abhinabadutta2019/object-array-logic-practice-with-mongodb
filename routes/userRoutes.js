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

//How many people have a score of 20 or lower in all subjects combined
router.get("/test", async (req, res) => {
  try {
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
// How many people have a score of 30 to 35 higher in "Subject 1" and "Subject 4"?
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $match: {
          $or: [
            {
              "grades.subject": "Subject 1",
            },
            {
              "grades.subject": "Subject 2",
            },
          ],
        },
      },
      {
        $match: {
          "grades.score": {
            $gt: 30,
            $lt: 75,
          },
        },
      },
      {
        $group: {
          _id: "$name",
          fieldN: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: null,
          fieldN: {
            $sum: 1,
          },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Which person has the lowest score in "Subject 2" and the highest score in "Subject 4"?
router.get("/test2", async (req, res) => {
  try {
    //
    const highestSubject2 = await User.aggregate([
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $match: {
          "grades.subject": "Subject 2",
        },
      },
      {
        $group: {
          _id: "$_id",
          highestScore: {
            $max: "$grades.score",
          },
        },
      },
      {
        $sort: {
          highestScore: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    //
    console.log(highestSubject2);
    //
    const lowestSubject3 = await User.aggregate([
      {
        $unwind: {
          path: "$grades",
        },
      },
      {
        $match: {
          "grades.subject": "Subject 2",
        },
      },
      {
        $group: {
          _id: "$_id",
          highestScore: {
            $min: "$grades.score",
          },
        },
      },
      {
        $sort: {
          highestScore: 1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    console.log(lowestSubject3);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
