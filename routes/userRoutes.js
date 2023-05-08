const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//group by each subject and highest scorer
//done by gpt
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const output = {};
    //
    allUsers.forEach((item) => {
      item.grades.forEach((grade) => {
        if (
          !output[grade.subject] ||
          output[grade.subject].score < grade.score
        ) {
          output[grade.subject] = {
            subject: grade.subject,
            score: grade.score,
            highestScorer: item.name,
          };
        }
      });
    });

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
//expected output
//group by each subject and highest scorer
//{
//   "Subject 1": {
//     "subject": "Subject 1",
//     "score": 99,
//     "highestScorer": "Person 94"
// },
// "Subject 2": {
//     "subject": "Subject 2",
//     "score": 100,
//     "highestScorer": "Person 27"
// },
// }
//
//
router.get("/try10", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let index = 0; index < allUsers.length; index++) {
      const gradesArray = allUsers[index].grades;
      //
      for (let index = 0; index < gradesArray.length; index++) {
        const oneTopic = gradesArray[index];
        //
        if (!outputObject[oneTopic.subject]) {
          outputObject[oneTopic.subject] = {
            subject: oneTopic.subject,
            score: oneTopic.score,
            highScorer: allUsers[index].name,
          };
        }
        //
        // console.log(oneTopic.score, "current loop er score");
        // console.log(
        //   outputObject[oneTopic.subject].subject,
        //   "output object er key"
        // );
        // console.log(oneTopic.subject, "current loop er subject");
        //
        // if (outputObject[oneTopic.subject]) {
        //   console.log(outputObject[oneTopic.subject].score);
        // }
        //
        if (
          outputObject[oneTopic.subject].subject === oneTopic.subject &&
          outputObject[oneTopic.subject].score < oneTopic.score
        ) {
          outputObject[oneTopic.subject].score = oneTopic.score;
          outputObject[oneTopic.subject].name = allUsers[index].name;
        }
      }
    }
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//try 9 er chat gpt er logic ta better logic
//
router.get("/try11", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      gradesArray.forEach(function (oneTopic) {
        if (!outputObject[oneTopic.subject]) {
          outputObject[oneTopic.subject] = {
            subject: oneTopic.subject,
            score: oneTopic.score,
            highScorer: oneObj.name,
          };
        }
        //
        if (
          outputObject[oneTopic.subject].subject === oneTopic.subject &&
          oneTopic.score > outputObject[oneTopic.subject].score
        ) {
          outputObject[oneTopic.subject].score = oneTopic.score;
          outputObject[oneTopic.subject].highScorer = oneObj.name;
        }
      });
    });
    //
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try12", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try13", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try14", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try15", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try16", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////
//aggregate
//////////////////////////////

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
    const allUsers = await User.aggregate([]);

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Which person has the lowest score in "Subject 2" and the highest score in "Subject 4"?
router.get("/test2", async (req, res) => {
  try {
    //
    const allUsers = await User.aggregate([]);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
