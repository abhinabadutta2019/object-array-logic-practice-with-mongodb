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

//solved by gpt
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const filteredUsers = allUsers.filter((user) => {
      let score2 = user.grades.find((grade) => grade.subject === "Subject 2");
      let score4 = user.grades.find((grade) => grade.subject === "Subject 4");
      return score2.score <= 30 && score4.score <= 30;
    });
    const count = filteredUsers.length;
    res.send({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

//solved by gpt
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let filteredArray = allUsers.filter(function (individualItem) {
      let gradesArray = individualItem.grades;

      let filteredSubject2 = gradesArray.filter(function (eachSubject) {
        return eachSubject.subject === "Subject 2" && eachSubject.score <= 30;
      });

      let filteredSubject4 = gradesArray.filter(function (eachSubject) {
        return eachSubject.subject === "Subject 4" && eachSubject.score <= 30;
      });

      return filteredSubject2.length > 0 && filteredSubject4.length > 0;
    });

    res.send(filteredArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//solved by gpt
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let filteredUsers = allUsers.filter((individualItem) => {
      let foundLowScore2 = false;
      let foundLowScore4 = false;

      individualItem.grades.forEach((grade) => {
        if (grade.subject === "Subject 2" && grade.score <= 30) {
          foundLowScore2 = true;
        }
        if (grade.subject === "Subject 4" && grade.score <= 30) {
          foundLowScore4 = true;
        }
      });
      //
      console.log(foundLowScore2, "foundLowScore2");
      console.log(foundLowScore4, "foundLowScore4");

      return foundLowScore2 && foundLowScore4;
    });

    res.send(filteredUsers);
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
