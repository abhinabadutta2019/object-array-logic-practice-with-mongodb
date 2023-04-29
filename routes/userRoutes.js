const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const e = require("express");
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

//What is the average score of people aged 25 or younger in "Subject 3"?
//for loop
router.get("/find1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let ageLessThan = [];
    //
    for (let index = 0; index < allUsers.length; index++) {
      //eta correct
      const element = allUsers[index].grades;

      // const element = allUsers[index];

      //checking age

      if (allUsers[index].age < 26) {
        //
        // console.log(allUsers[index]);
        // console.log(element, "grades array");

        //grades array portion
        for (let j = 0; j < element.length; j++) {
          const eachGradesObject = element[j];
          //
          // console.log(eachGradesObject, "eachGradesObject");
          if (eachGradesObject.subject === "Subject 3") {
            //
            // console.log(eachGradesObject.score, "eachGradesObject");
            //
            ageLessThan.push(eachGradesObject.score);
          }
        }
      }
    }
    //
    // console.log(ageLessThan);
    let sumageLessThan = ageLessThan.reduce(function (
      accumulator,
      currentValue
    ) {
      accumulator = accumulator + currentValue;
      return accumulator;
    });
    // console.log(sumageLessThan);

    // let ageLessThanLength = ageLessThan.length;
    // console.log(ageLessThanLength);

    //
    let ageLessThanAvarage = sumageLessThan / ageLessThan.length;
    console.log(ageLessThanAvarage);
    //

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//What is the average score of people aged 25 or younger in "Subject 3"?
//forEach
router.get("/find2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //foreach age
    //array to store age<25
    let ageLessThan = [];
    allUsers.forEach(function (element) {
      //
      if (element.age < 25) {
        // console.log(element);
        //
        ageLessThan.push(element);
      }
      //
    });
    //

    //array to store subject 3 marks
    let subject3Marks = [];

    //
    ageLessThan.forEach(function (params) {
      //
      // console.log(params.grades, "gradesArray Part");
      //
      let gradesArray = params.grades;
      //
      gradesArray.forEach(function (eachSubject) {
        // console.log(eachSubject);
        if (eachSubject.subject === "Subject 3") {
          // console.log(eachSubject.score);
          subject3Marks.push(eachSubject.score);
        }
      });
    });
    // console.log(subject3Marks);
    //
    //
    let totalSum = 0;
    //
    subject3Marks.forEach(function (eachItem) {
      totalSum = totalSum + eachItem;
    });
    console.log(totalSum);
    //
    let avarageScore = totalSum / subject3Marks.length;
    console.log(avarageScore, "avarageScore");
    //
    res.send();
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
