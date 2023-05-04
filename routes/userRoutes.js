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

// Write a function that returns an array of objects with the name and age of each person
//map+sort
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find();
    let outerArray = allUsers.map(function (params) {
      return { age: params.age, name: params.name };
    });
    let k = outerArray.sort(function (firstItem, secondItem) {
      //
      return firstItem.age - secondItem.age;
    });
    res.send(k);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Write a function that returns an array of objects with the name and age of each person
//for loop
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyArray = [];
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index];
      let j = { eName: element.name, eAge: element.age };
      emptyArray.push(j);
    }
    //
    let k = emptyArray.sort(function (firstItem, secondItem) {
      return secondItem.eAge - firstItem.eAge;
    });
    res.send(k);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a function that returns the average age of all the people in the objects.
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let sumOfAge = allUsers.reduce(function (accumulator, currentValue) {
      // console.log(currentValue.age);
      // console.log(accumulator, "accumulator");

      return accumulator + currentValue.age;
    }, 0);
    console.log(sumOfAge);
    let avgAge = sumOfAge / allUsers.length;

    res.send({ avgAge });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Write a function that returns the average age of all the people in the objects.
//with for loop
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let totalAge = 0;
    //
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index].age;
      // console.log(element);
      totalAge = totalAge + element;
    }
    // console.log(totalAge);
    let totalUser = allUsers.length;
    let avgAge1 = totalAge / totalUser;
    //
    res.send({ avgAge1 });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Write a function that returns the average age of all the people in the objects.
//foreach
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let totalAge = 0;
    allUsers.forEach(function (eachUsers) {
      let oneAge = eachUsers.age;
      totalAge = totalAge + oneAge;
    });
    //
    let avgAge = totalAge / allUsers.length;

    res.send({ avgAge });
  } catch (error) {
    res.status(500).send(error);
  }
});
//highest score of each user
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let mapResult = allUsers.map(function (eachUsers) {
      let gradesArray = eachUsers.grades;
      // return gradesArray;
      // console.log(gradesArray);
      //
      let maxValue = gradesArray.reduce(function (highValue, currentValue) {
        if (currentValue.score > highValue) {
          return currentValue.score;
        } else {
          return highValue;
        }
      }, -1);
      // console.log(maxValue);
      // return maxValue;
      return { name: eachUsers.name, maxValue: maxValue };
    });
    res.send(mapResult);
  } catch (error) {
    res.status(500).send(error);
  }
});
//

//highest score of each user
//using for loop
router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyArray = [];
    //
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index].grades;
      //
      let highScore = -1;
      for (let index = 0; index < element.length; index++) {
        // console.log(element[index].score, "element-index");
        let currentScore = element[index].score;
        if (currentScore > highScore) {
          highScore = currentScore;
        } else {
          highScore = highScore;
        }
      }
      //
      let p = { highScore: highScore, name: allUsers[index].name };
      // console.log(p);
      //
      emptyArray.push(p);
    }
    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});

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
