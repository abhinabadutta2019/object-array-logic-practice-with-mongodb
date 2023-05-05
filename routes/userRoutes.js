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
// print out the name and city of each person
//map
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let mapArray = allUsers.map(function (oneObj) {
      return { name: oneObj.name, city: oneObj.address.city };
    });

    res.send(mapArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
// print out the name and city of each person
//for loop
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    for (let i = 0; i < allUsers.length; i++) {
      const element = allUsers[i];
      //
      let p = { name: allUsers[i].name, city: allUsers[i].address.city };
      emptyArray.push(p);
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//print out the average score of each person in the array.
//map
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outerMap = allUsers.map(function (oneObj) {
      //
      let totalScore = 0;
      let gradesArray = oneObj.grades;
      //
      let innerMap = gradesArray.map(function (oneTopic) {
        totalScore = totalScore + oneTopic.score;
        return totalScore;
      });
      let avgScore = totalScore / gradesArray.length;
      // console.log(innerMap);
      // console.log(avgScore);
      // console.log(totalScore);
      return { name: oneObj.name, avgScore: avgScore };
    });

    res.send(outerMap);
  } catch (error) {
    res.status(500).send(error);
  }
});
//print out the average score of each person in the array.
//map+reduce
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let outerMap = allUsers.map(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let innerReduce = gradesArray.reduce(function (
        accumulator,
        currentValue
      ) {
        accumulator = accumulator + currentValue.score;
        return accumulator;
      },
      0);
      return { avgScore: innerReduce / gradesArray.length, name: oneObj.name };
    });

    res.send(outerMap);
  } catch (error) {
    res.status(500).send(error);
  }
});
//print out the average score of each person in the array.
//for loop
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    for (let i = 0; i < allUsers.length; i++) {
      const element = allUsers[i].grades;
      //
      let totalScore = 0;
      for (let j = 0; j < element.length; j++) {
        const oneTopic = element[j];
        //
        totalScore = totalScore + oneTopic.score;
        //
      }
      let avgScore = totalScore / element.length;
      // console.log(avgScore);
      let oneFinalObj = { avgScore: avgScore, name: allUsers[i].name };
      //
      emptyArray.push(oneFinalObj);
    }
    //
    let currAvg = 0;
    let currName;
    // now sort the array
    for (let k = 0; k < emptyArray.length; k++) {
      const onePro = emptyArray[k].avgScore;
      // console.log(onePro.avgScore);
      if (currAvg < onePro) {
        currAvg = onePro;
        currName = emptyArray[k].name;
      }
    }
    console.log(currName, currAvg);

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//print out the average score of each person in the array.
//foreach loop
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      let totalScore = 0;
      gradesArray.forEach(function (oneTopic) {
        totalScore = totalScore + oneTopic.score;
      });
      let avgScore = totalScore / gradesArray.length;
      // console.log(avgScore);
      let finalObj = { name: oneObj.name, avgScore: avgScore };
      emptyArray.push(finalObj);
    });
    //sort emptyArray
    let output = emptyArray.sort(function (a, b) {
      return b.avgScore - a.avgScore;
    });
    // console.log(output);
    res.send(output);
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
