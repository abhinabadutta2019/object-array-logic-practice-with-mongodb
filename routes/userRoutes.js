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

/////////////////////////////////////////////////
//$elemMatch example
////////////////////////////////////////////////
//score in subject 1 grater than 90,- with $elemMatch
//grades: { $elemMatch: { subject: "Subject 1", score: { $gt: 90 } } },

//score in subject 1 grater than 90, less than & equal to 93
// grades: {
//   $elemMatch: { subject: "Subject 1", score: { $gt: 90, $lte: 93 } },
// },
////score in subject 1 is exactly- 93
// grades: { $elemMatch: { subject: "Subject 1", score: 93 } },
router.get("/test3", async (req, res) => {
  try {
    const users = await User.find({
      grades: {
        $elemMatch: { subject: "Subject 1", score: { $gt: 90, $lte: 93 } },
      },
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//score in Subject 1 and Subject 2 is more than 85, you can use the $and operator to combine two $elemMatch expressions like this
//
// {
//   $and: [
//     {
//       grades: { $elemMatch: { subject: "Subject 1", score: { $gt: 85 } } },
//     },
//     {
//       grades: { $elemMatch: { subject: "Subject 2", score: { $gt: 85 } } },
//     },
//   ],
// }

//score in subject 1 is exactly 85 and score in subject 2 is grater than 85
// {
//   $and: [
//     {
//       grades: { $elemMatch: { subject: "Subject 1", score: 85 } },
//     },
//     {
//       grades: { $elemMatch: { subject: "Subject 2", score: { $gt: 85 } } },
//     },
//   ],
// }
//
router.get("/test4", async (req, res) => {
  try {
    const users = await User.find({
      //score in subject 1 is exactly 85 and score in subject 2 is grater than 85
      $and: [
        {
          grades: { $elemMatch: { subject: "Subject 1", score: 85 } },
        },
        {
          grades: { $elemMatch: { subject: "Subject 2", score: { $gt: 85 } } },
        },
      ],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//This will return all users who have a grade in either Subject 1 or Subject 2 with a score greater than 95
router.get("/test5", async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        {
          grades: { $elemMatch: { subject: "Subject 1", score: { $gt: 95 } } },
        },
        {
          grades: { $elemMatch: { subject: "Subject 2", score: { $gt: 95 } } },
        },
      ],
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//combined score of all subject is less than 100

//{
//   $expr: {
//     $lt: [{ $sum: "$grades.score" }, 100],
//   },
// }

//combined score of all subject is grater than and equal to  370
// {
//   $expr: {
//     $gt: [{ $sum: "$grades.score" }, 370],
//   },
// }

router.get("/test6", async (req, res) => {
  try {
    const users = await User.find({
      $expr: {
        $gt: [{ $sum: "$grades.score" }, 370],
      },
    });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//find all users whose avarage of all subject is grater than 75
router.get("/test7", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          grades: 1,
          average: { $avg: "$grades.score" },
        },
      },
      {
        $match: {
          average: { $gt: 75 },
        },
      },
    ]);
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});
//

//

//
module.exports = router;
