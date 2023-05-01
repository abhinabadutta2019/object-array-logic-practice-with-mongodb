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

//Find all the persons who have scored less than 50 in all subject.
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerFilterArray = allUsers.filter(function (eachObject) {
      let gradesArray = eachObject.grades;
      //
      let innerFilterArray = gradesArray.filter(function (eachItem) {
        console.log(eachItem);
        return eachItem.score > 50;
      });
      // console.log(innerFilterArray);
      return innerFilterArray.length < 1;
    });

    res.send(outerFilterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Find all the persons who have not scored less than 50 in any subject.
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outerFilterArray = allUsers.filter(function (eachObject) {
      let gradesArray = eachObject.grades;
      //
      let innerFilterArray = gradesArray.filter(function (eachItem) {
        console.log(eachItem);
        return eachItem.score < 50;
      });
      // console.log(innerFilterArray);
      return innerFilterArray.length < 1;
    });

    res.send(outerFilterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//have scored more than 40 in all subjects
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let outerArrayFilter = allUsers.filter(function (eachObject) {
      let gradeArray = eachObject.grades;
      //
      let innerFilter = gradeArray.filter(function (eachTopic) {
        // console.log(eachTopic.score, "eachTopic.score");
        return eachTopic.score < 40;
        // return true;
      });
      console.log(innerFilter, "innerFilter");
      //
      return innerFilter.length === 0;
      // return !(innerFilter.length > 0);
      //
    });

    res.send(outerArrayFilter);
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
