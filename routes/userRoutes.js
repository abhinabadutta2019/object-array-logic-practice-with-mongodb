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

//Find all the persons who have scored less than 50 in "Subject 3" or have a score greater than or equal to 80 in "Subject 4".
//not diye korbo
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerFilter = allUsers.filter(function (eachObject) {
      let gradesArray = eachObject.grades;
      //
      let innerFilter = gradesArray.filter(function (item) {
        //
        if (item.subject === "Subject 3" && !(item.score > 50)) {
          // return item.subject === "Subject 4" && item.score > 1;
          return true;
        }
      });
      //
      let innerFilterForSubject4 = gradesArray.filter(function (item) {
        return item.subject === "Subject 4" && item.score > 80;
      });
      return innerFilter.length > 0 && innerFilterForSubject4.length > 0;
    });
    res.send(outerFilter);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 60 in any subject and have an even age.
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outerArray = allUsers.filter(function (eachObject) {
      //
      let gradesArray = eachObject.grades;

      let innerArray = gradesArray.filter(function (item) {
        // console.log(item);
        return item.score < 60;
      });

      return innerArray.length < 1;
    });

    res.send(outerArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try3", async (req, res) => {
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
