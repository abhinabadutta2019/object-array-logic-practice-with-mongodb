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

//

//How many people have a score of 30 or lower in Subject 2 and Subject 4?

router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let emptyArray = [];

    allUsers.forEach(function (individualItem) {
      // console.log(individualItem);
      //
      let gradesArray = individualItem.grades;
      //
      //
      gradesArray.forEach(function (eachSubject) {
        // console.log(eachSubject);
        if (eachSubject.subject === "Subject 2" && eachSubject.score < 30) {
          // console.log(individualItem, "individualItem");
          //
          let lowInSecond = individualItem.grades;
          //
          lowInSecond.forEach(function (oneScore) {
            if (oneScore.subject === "Subject 4" && oneScore.score < 30) {
              // console.log(individualItem);

              //
              emptyArray.push(individualItem);
            }
          });
        }
      });
    });

    res.send(emptyArray);
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
