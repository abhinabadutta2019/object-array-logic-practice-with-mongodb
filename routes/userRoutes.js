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

//////////////////////////////////////////////////////////////////////////////////////
//Object groupping related-- practice
///////////////////////////////////////////////////////////////////////////////////////

//Group the objects by their age.
//for loop
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let i = 0; i < allUsers.length; i++) {
      const element = allUsers[i];
      //
      if (!outputObject[element.age]) {
        outputObject[element.age] = [element];
      } else {
        outputObject[element.age].push(element);
      }
    }
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Group the objects by their highest score in the grades array.
//for loop
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      let highScore = -1;
      for (let j = 0; j < gradesArray.length; j++) {
        let grade = gradesArray[j];
        //
        if (highScore < grade.score) {
          highScore = grade.score;
        }
      }
      //
      // console.log(highScore);
      if (!outputObject[highScore]) {
        outputObject[highScore] = [allUsers[i].name];
      }
      //
      else {
        outputObject[highScore].push(allUsers[i].name);
      }

      // break;
    }

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//group by age- subject 1 highest scorer
//for loop
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};

    for (let i = 0; i < allUsers.length; i++) {
      const age = allUsers[i].age;
      const gradesArray = allUsers[i].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const grade = gradesArray[j];

        //
        if (grade.subject === "Subject 1") {
          // console.log(grade.subject);
          if (!outputObject[age]) {
            outputObject[age] = grade.score;
          } else if (outputObject[age] && grade.score > outputObject[age]) {
            outputObject[age] = grade.score;
            //this not necessery
            outputObject[`${age} scorer name`] = allUsers[i].name;
            // console.log("Hi");
          }
        }
      }
      // break;
    }

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//group by age- subject 1 highest scorer
//foreach
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    allUsers.forEach(function (oneObj) {
      //
      let gradesArray = oneObj.grades;
      const age = oneObj.age;
      //
      gradesArray.forEach(function (grade) {
        if (grade.subject === "Subject 1") {
          if (!outputObject[age]) {
            outputObject[age] = grade.score;
          }
          //
          else if (outputObject[age] && grade.score > outputObject[age]) {
            outputObject[age] = grade.score;
            // console.log("HI");
          }
          // console.log(grade.score);
        }
      });
    });

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//////////////////////////////////////////////////////////////////////////////////////
//ends ---- Object groupping related-- practice
///////////////////////////////////////////////////////////////////////////////////////

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
//
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
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
