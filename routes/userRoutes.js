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

//How many people have a score of 30 or higher in "Subject 1" and "Subject 4"?

router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let emptyArray = [];

    allUsers.filter(function (element) {
      // console.log(element.grades);
      //
      let gradesArray = element.grades;
      //
      gradesArray.filter(function (eachGrade) {
        // console.log(eachGrade);

        //

        //check if less than in subject2
        if (eachGrade.subject === "Subject 2" && eachGrade.score < 30) {
          // console.log(eachGrade);
          // console.log(element.grades);
          let fourthSubject = element.grades;
          //
          fourthSubject.filter(function (eachMarks) {
            // console.log(eachMarks);
            if (eachMarks.subject === "Subject 4" && eachMarks.score < 30) {
              // console.log(eachMarks);
              emptyArray.push(element);
            }
          });
        }
      });
      // console.log(emptyArray);
    });

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log(typeof allUsers);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////
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
