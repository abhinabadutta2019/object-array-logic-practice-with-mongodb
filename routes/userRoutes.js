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
// find all the people whose age is greater than or equal to 50.
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let filterallUsers = allUsers.filter(function (params) {
      return params.age > 50;
    });

    res.send(filterallUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
// create an allUsers of strings with the names of all the people.
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let mapallUsers = allUsers.map(function (params) {
      return params.name;
    });
    let textJoin = mapallUsers.join("");
    // console.log(mapallUsers);
    // res.send(textJoin);
    res.send(textJoin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// print out the city of each person in the allUsers.
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let resultallUsers = allUsers.map(function (params) {
      return params.address.city;
    });

    res.send(resultallUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Using filter, find all the people who got a score of 90 or higher in any subject.
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});

    //
    let outerallUsers = allUsers.filter(function (user) {
      //
      let gradeallUsers = user.grades;
      //
      let innerallUsers = gradeallUsers.filter(function (mark) {
        return mark.score > 99;
      });
      // console.log(innerallUsers, "innerallUsers");
      // console.log(innerallUsers.length, "innerallUsers.length");
      return innerallUsers.length > 0;
    });
    // console.log(outerallUsers, "outerallUsers");
    res.send(outerallUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Using map, create an allUsers of objects containing the name and score of each person's highest-scoring subject.
//etate each person er highest score sudhu pacchi
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outerallUsers = allUsers.map(function (theObj) {
      let gradeallUsers = theObj.grades;
      let innerallUsers = gradeallUsers.map(function (params) {
        return params.score;
      });
      return innerallUsers;
    });
    // console.log(outerallUsers);
    //
    //
    let maxValue = outerallUsers.map(function (item) {
      // console.log(item, "item");
      return Math.max(...item);
      // console.log(k);
    });
    console.log(maxValue);

    res.send(outerallUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Using map, create an allUsers of objects containing the name and score of each person's highest-scoring subject.
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let outerallUsers = allUsers.map(function (oneObj) {
      let gradeallUsers = oneObj.grades;
      // console.log(gradeallUsers, "gradeallUsers");
      let highestScore = Math.max(
        ...gradeallUsers.map(function (oneGrade) {
          return oneGrade.score;
        })
      );
      //
      return { name: oneObj.name, score: highestScore };
    });

    res.send(outerallUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Using map, create an allUsers of objects containing the name and score of each person's highest-scoring subject.
//for loop diye ager ta korbo
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let resultNewArray = [];
    //
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index];
      //
      let gradesArray = element.grades;
      // console.log(gradesArray, "gradesArray");
      //
      let k = [];
      for (let index = 0; index < gradesArray.length; index++) {
        const eachGrades = gradesArray[index];
        // console.log(eachGrades.score, "eachGrades");
        k.push(eachGrades.score);
      }
      // console.log(k, "k"); //all scores of one individual
      let p = Math.max(...k); // highst score
      // console.log(p);
      // console.log(element.name, "element-name");
      let j = { name: element.name, maxScore: p };
      // console.log(j, "j");
      resultNewArray.push(j);
    }
    res.send(resultNewArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
// create an allUsers of objects containing the name and score of each person's highest-scoring subject.
//ebar foreach diye
router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});
    endArray = [];
    allUsers.forEach(function (eachObj) {
      let gradesArray = eachObj.grades;
      // console.log(gradesArray, "gradesArray");
      //
      allScores = [];
      //
      gradesArray.forEach(function (eachMark) {
        allScores.push(eachMark.score);
      });
      maxScore = Math.max(...allScores);
      // console.log(maxScore, "maxScore");
      let newObj = { name: eachObj.name, highScore: maxScore };
      endArray.push(newObj);
    });
    res.send(endArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
// create an allUsers of objects containing the name and score of each person's highest-scoring subject.
//ebar map diye
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerArray = allUsers.map(function (eachObj) {
      let gradesArray = eachObj.grades;

      //
      let maxScore = Math.max(
        ...gradesArray.map(function (params) {
          return params.score;
        })
      );

      return { highScore: maxScore, name: eachObj.name };
    });

    res.send(outerArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
// create an allUsers of objects containing the name and score of each person's highest-scoring subject.
//
router.get("/try10", async (req, res) => {
  try {
    const allUsers = await User.find();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//
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
