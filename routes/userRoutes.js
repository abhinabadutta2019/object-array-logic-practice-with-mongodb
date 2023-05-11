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
//
//////////////////////////////////////////////////////////////////////////////////////
//starts-Array related-- map, filter -- practice
///////////////////////////////////////////////////////////////////////////////////////

//Find all the persons who have not scored less than 60 in any subject
//for loop
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputArray = [];
    //
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      let counter = 0;
      // console.log(counter, "start");
      for (let j = 0; j < gradesArray.length; j++) {
        const grade = gradesArray[j];
        //
        if (grade.score < 60) {
          counter = counter + 1;
        }
      }
      if (counter === 0) {
        outputArray.push(allUsers[i]);
      }
      //
      // console.log(counter, "end");
    }

    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 60 in any subject
//foreach
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let outputArray = [];
    //
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let below = 0;
      gradesArray.forEach(function (grades) {
        //

        if (grades.score < 45) {
          below = below + 1;
        }
      });
      if (below === 0) {
        outputArray.push(oneObj);
      }
    });

    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 60 in any subject
//filter
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputArray = allUsers.filter(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let filterGrades = gradesArray.filter(function (grade) {
        if (grade.score < 60) {
          return true;
        }
      });
      if (filterGrades.length === 0) {
        return true;
      }
      // console.log();
      // return;
    });
    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//find all the people who got a score of 90 or higher in two or more subject.

router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerFilter = allUsers.filter(function (oneObj) {
      //
      let gradesArray = oneObj.grades;
      //
      let innerFilter = gradesArray.filter(function (grade) {
        //
        if (grade.score > 90) {
          return true;
        }
      });
      // console.log(innerFilter.length);
      if (innerFilter.length >= 2) {
        return true;
      }
    });
    res.send(outerFilter);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns an array of objects with the name and highest scoring subject of each person.
//map
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerMap = allUsers.map(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let highScore = -1;
      gradesArray.forEach(function (grade) {
        if (grade.score > highScore) {
          highScore = grade.score;
        }
      });
      // console.log(highScore);
      return { name: oneObj.name, highScore };
    });
    //
    res.send(outerMap);
  } catch (error) {
    res.status(500).send(error);
  }
});
//create an array of objects containing the name and total score of each person.
//also sorted
router.get("/try10", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerMap = allUsers.map(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let totalScore = 0;
      gradesArray.forEach(function (grade) {
        //
        totalScore = totalScore + grade.score;
        //
      });
      //
      if (totalScore) {
        return { name: oneObj.name, sumOfScores: totalScore };
      }
      //
    });
    //
    let sortedArray = outerMap.sort(function (a, b) {
      return b.sumOfScores - a.sumOfScores;
    });
    res.send(sortedArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try11", async (req, res) => {
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
// How many people have a score of 30 to 35 higher in "Subject 2" and "Subject 4"?
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
