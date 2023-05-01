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
//if "Subject 1" score less than 5, filter method--then add if if "Subject 2" score less than 35
//method 1
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    //

    let filterResult = allUsers.filter(function (individual) {
      let gradesArray = individual.grades;
      //
      let filterSubject1 = gradesArray.filter(function (eachSubject) {
        if (eachSubject.subject === "Subject 1" && eachSubject.score < 5) {
          return true;
        }
      });
      //
      let filterSubject2 = gradesArray.filter(function (perSubject) {
        return perSubject.subject === "Subject 2" && perSubject.score < 40;
      });
      //
      console.log(filterSubject1);
      //
      return filterSubject1.length > 0 && filterSubject2.length > 0;
    });
    // console.log(filterResult);

    res.send(filterResult);
  } catch (error) {
    res.status(500).send(error);
  }
});
//method 2
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let subject1Marks = -1;
    let subject2Marks = -1;
    //
    let finalFilterArray = allUsers.filter(function (perUser) {
      //
      let gradesArray = perUser.grades;
      //
      let subject1Filter = gradesArray.filter(function (oneBishoy) {
        //
        subject1Marks = oneBishoy.score;
        //
        if (oneBishoy.subject === "Subject 1" && subject1Marks < 5) {
          return true;
        }
      });
      //
      let subject2Filter = gradesArray.filter(function (oneSub) {
        subject1Marks = oneSub.score;
        return subject1Marks > 25 && oneSub.subject === "Subject 3";
      });
      console.log(subject2Filter);
      return subject1Filter.length > 0 && subject2Filter.length > 0;
    });
    res.send(finalFilterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//if "Subject 1" score less than 10
//
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});

    emptyArray = allUsers.filter(function (oneBird) {
      let onlyGrades = oneBird.grades;
      //
      let subject1Array = onlyGrades.filter(function (oneBishoy) {
        return oneBishoy.subject === "Subject 1";
        //
      });
      //
      // console.log(subject1Array, "subject1Array");
      //
      if (subject1Array[0].score < 10) {
        return true;
      }
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
