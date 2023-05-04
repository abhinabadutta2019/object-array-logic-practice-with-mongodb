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
//

//highest score of each user
//forEach diye korbo
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyArray = [];
    allUsers.forEach(function (eachObj) {
      let gradesArray = eachObj.grades;
      //
      let highScore = -1;
      //
      gradesArray.forEach(function (eachInnerObj) {
        if (eachInnerObj.score > highScore) {
          highScore = eachInnerObj.score;
        } else {
          highScore = highScore;
        }
      });
      let newObj = { highScore: highScore, name: eachObj.name };
      //
      emptyArray.push(newObj);
    });
    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns an object with the name and address of the person with the highest overall score.
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let endArray = allUsers.map(function name(eachObj) {
      let gradesArray = eachObj.grades;
      //
      let totalScore = gradesArray.reduce(function (accumulator, currentScore) {
        // console.log(accumulator, "ac");
        // console.log(currentScore.score, "cs");
        return accumulator + currentScore.score;
      }, 0);
      return {
        name: eachObj.name,
        address: eachObj.address,
        totalScore: totalScore,
      };
    });
    //this portion done by gpt
    let sortEndArray = endArray.reduce(
      function (highScore, currentScore) {
        if (highScore.totalScore < currentScore.totalScore) {
          return currentScore;
        } else {
          return highScore;
        }
      },
      { totalScore: -1 }
    );
    //
    console.log(sortEndArray);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns an object with the name and address of the person with the highest overall score.
//with sort method
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let endArray = allUsers.map(function name(eachObj) {
      let gradesArray = eachObj.grades;
      //
      let totalScore = gradesArray.reduce(function (accumulator, currentScore) {
        // console.log(accumulator, "ac");
        // console.log(currentScore.score, "cs");
        return accumulator + currentScore.score;
      }, 0);
      return {
        name: eachObj.name,
        address: eachObj.address,
        totalScore: totalScore,
      };
    });
    //sort method
    let k = endArray.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    });
    // console.log(k);
    let highestObject = k[0];
    res.send(highestObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns an object with the name and address of the person with the highest overall score.
//use loop
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index].grades;
      //
      let totalScore = 0;
      for (let index = 0; index < element.length; index++) {
        const oneGradeObj = element[index];
        // console.log(oneGradeObj, "oneGradeObj");
        //
        totalScore = totalScore + oneGradeObj.score;
      }
      let k = { totalScore: totalScore, name: allUsers[index].name };
      emptyArray.push(k);
    }
    //
    let highScore = -1;
    let highName;
    for (let index = 0; index < emptyArray.length; index++) {
      let oneItem = emptyArray[index].totalScore;
      if (oneItem > highScore) {
        highScore = oneItem;
        highName = emptyArray[index].name;
      }
    }
    // console.log(highScore, highName);
    let result = { highScore: highScore, highName: highName };
    //
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns an object with the name and address of the person with the highest overall score.
//foreach
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    allUsers.forEach(function (eachObj) {
      let gradesArray = eachObj.grades;
      //
      let totalScore = 0;
      gradesArray.forEach(function (eachSubj) {
        // console.log(eachSubj, "eachSubj");
        //
        totalScore = totalScore + eachSubj.score;
      });

      //
      let emtObj = { totalScore: totalScore, name: eachObj.name };
      //
      emptyArray.push(emtObj);
      //
    });
    //
    let tall = -1;
    let tallName;
    emptyArray.forEach(function (eachTotal) {
      // console.log(eachTotal, "eachTotal");
      if (eachTotal.totalScore > tall) {
        tall = eachTotal.totalScore;
        tallName = eachTotal.name;
      }
    });
    const endResult = { tall: tall, tallName: tallName };
    //
    res.send(endResult);
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
