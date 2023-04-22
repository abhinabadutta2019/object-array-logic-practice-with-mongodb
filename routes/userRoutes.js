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
      // 7. How many people have a score of 20 or lower in all any of the subjects ?

      {
        $unwind: "$grades",
      },

      {
        $match: { "grades.score": { $lte: 20 } },
      },
      {
        $group: {
          _id: "$name",
          totalScores: {
            $sum: 1,
          },
        },
      },

      //eta reply asche

      // [
      //   {
      //     _id: "Person 107",
      //     totalScores: 2,
      //   },
      //   {
      //     _id: "Person 12",
      //     totalScores: 2,
      //   },
      // ],
      //^^^^^^^ this part correct-- eta mane-- joto gulo totalScores ache tar jogfol
      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: 1 },
      //   },
      // },
      //
      //
      //^^^^^^^  uporer part ta ar eta ek e kaj korche--- jotogulo item ache -- jog korche
      {
        $group: {
          _id: null,
          count: { $count: {} },
        },
      },

      //just testing--- jodi sobkora totalScores k jogkori
      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: "$totalScores" },
      //   },
      // },

      //this works
      // {
      //   $count: "totalScores",
      // },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//process 2
router.get("/test1", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },

      {
        $match: { "grades.score": { $lte: 20 } },
      },
      {
        $group: {
          _id: "$name",
          totalScores: {
            $sum: 1,
          },
        },
      },
      //****eta kore sobkota k-- array er moddhe dhokano hocche
      {
        $group: {
          _id: null,
          totalPeople: { $push: "$_id" },
        },
      },
      //****eta reply asche
      //     {
      //       "_id": null,
      //       "totalPeople": [
      //           "Person 71",
      //           "Person 23",
      //           "Person 48",
      //           "Person 77",
      //           "Person 1",
      //           "Person 21"
      //         ]
      //     }
      // ]

      //****--- etar porer step
      {
        $group: {
          _id: null,
          totalPeopleCount: {
            $sum: { $size: "$totalPeople" },
          },
        },
      },
    ]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/test3", async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $unwind: "$grades",
      },

      {
        $match: { "grades.score": { $lte: 20 } },
      },
      {
        $group: {
          _id: "$name",
          totalScores: {
            $sum: 1,
          },
        },
      },
      //used project just to test
      {
        $project: {
          _id: 0,
          totalScores: 1,
        },
      },

      { $count: "totalScores" },
    ]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
module.exports = router;
