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

//solved by gpt
//Find all the persons who have not scored less than 50 in any subject.
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});

    //
    let filterArray = allUsers.filter(function (eachBud) {
      let gradesArray = eachBud.grades;
      //
      let filterGrades = gradesArray.filter(function (eachTopic) {
        if (eachTopic.score < 50) {
          return true;
        }
      });
      console.log(filterGrades);
      return filterGrades.length === 0;
    });

    res.send(filterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//solved by gpt
router.get("/try16", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let filteredArray = allUsers.filter(function (user) {
      let gradesArray = user.grades;

      // check if any grade score is less than 10
      let hasScoreLessThan10 = gradesArray.filter(function (grade) {
        return grade.score < 50;
      });
      //
      console.log(hasScoreLessThan10);
      return !hasScoreLessThan10;
    });

    res.send(filteredArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find all users whose age is between 22 and 25.
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = allUsers.filter(function (eachBuds) {
      //
      let budAge = eachBuds.age;

      return budAge <= 25 && budAge >= 22;
    });
    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find all the persons who live in "City 4".
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let filteredArray = allUsers.filter(function (oneBud) {
      console.log(oneBud.address.city);
      return oneBud.address.city === "City 4";
    });

    res.send(filteredArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find all the persons who have scored less than 7 in "Subject 2" and scored less than 50 in "Subject 3"
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let epmtyFilteredArray = allUsers.filter(function (oneBud) {
      let gradeArray = oneBud.grades;
      //
      let subject2Array = gradeArray.filter(function (eachItem) {
        return eachItem.subject === "Subject 2" && eachItem.score < 7;
      });
      console.log(subject2Array);
      //
      let subject3Array = gradeArray.filter(function (eachBishoy) {
        return eachBishoy.subject === "Subject 3";
      });
      //
      return subject2Array.length > 0 && subject3Array[0].score < 50;
    });

    res.send(epmtyFilteredArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who live in "State 14" and have scored more than 80 in any subject
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let filterArray = allUsers.filter(function (eachBud) {
      //
      let gradeArray = eachBud.grades;
      //
      let filterMarksArray = gradeArray.filter(function (eachTopic) {
        return eachTopic.score > 80;
      });

      // console.log(eachBud.address.state);
      //
      return (
        filterMarksArray.length > 0 && eachBud.address.state === "State 13"
      );
    });
    //
    res.send(filterArray);
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
