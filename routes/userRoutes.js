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

//How many people have a score of 80 or lower in all subjects combined
router.get("/find1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    const emptyArray = [];
    //
    // let scoreCombined = 0;

    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index];
      //
      // console.log(element.grades);
      //
      let elementGradesArray = element.grades;
      // console.log(elementGradesArray);
      //
      let scoreCombined = 0;
      // console.log(scoreCombined, "outer/before");
      //
      for (let index = 0; index < elementGradesArray.length; index++) {
        // console.log(elementGradesArray[index]);
        // console.log(elementGradesArray[index].score);
        let individualSubjectScore = elementGradesArray[index].score;
        // console.log(individualSubjectScore);
        //
        scoreCombined = scoreCombined + individualSubjectScore;
      }
      if (scoreCombined < 80) {
        // console.log(element, "Total object");
        // console.log(scoreCombined, "combined score");
        emptyArray.push(element);
      }
      // console.log(scoreCombined, "inner");
      // console.log(element);
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/find2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log(typeof allUsers);
    res.send(allUsers);
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
