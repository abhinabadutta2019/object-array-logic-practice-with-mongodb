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
//Grouping Objects by city
//using for loop
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});

    //
    let outputObject = {};

    for (let index = 0; index < allUsers.length; index++) {
      const thatCity = allUsers[index].address.city;
      // console.log(thatCity, "thatCity");
      if (!outputObject[thatCity]) {
        outputObject[thatCity] = [allUsers[index]];
      } else {
        outputObject[thatCity].push(allUsers[index]);
      }
    }

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Grouping Objects by city
//variable e na dhukiye -- boro syntax ta likjhlam
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});

    //
    let outputObject = {};

    for (let index = 0; index < allUsers.length; index++) {
      // const thatCity = allUsers[index].address.city;
      // console.log(thatCity, "thatCity");
      if (!outputObject[allUsers[index].address.city]) {
        outputObject[allUsers[index].address.city] = [allUsers[index]];
      } else {
        outputObject[allUsers[index].address.city].push(allUsers[index]);
      }
    }

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Grouping Objects by city
//foreach loop
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputObject = {};

    //
    allUsers.forEach(function (item) {
      //
      if (!outputObject[item.address.city]) {
        outputObject[item.address.city] = [item];
      }
      //
      outputObject[item.address.city].push(item);
    });

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Group the objects by their highest score in the grades array.
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    for (let index = 0; index < allUsers.length; index++) {
      const gradesArray = allUsers[index].grades;
      let highScore = -1;
      for (let index = 0; index < gradesArray.length; index++) {
        const scoreOfGrades = gradesArray[index].score;
        //
        if (scoreOfGrades > highScore) {
          highScore = scoreOfGrades;
        }
      }

      //
      if (!outputObject[highScore]) {
        outputObject[highScore] = [allUsers[index]];
      }
      outputObject[highScore].push(allUsers[index]);
    }
    console.log(outputObject);
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Group the objects by their highest score in the grades array.
//foreach
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyObject = {};
    allUsers.forEach(function (oneObj) {
      const gradesArray = oneObj.grades;
      let highScore = -1;
      gradesArray.forEach(function (oneItem) {
        if (highScore < oneItem.score) {
          highScore = oneItem.score;
        }
      });
      //
      if (!emptyObject[highScore]) {
        emptyObject[highScore] = [oneObj];
      }
      emptyObject[highScore].push(oneObj);
    });

    //
    res.send(emptyObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//each subject er highest score -- er group
//for loop- working
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyObject = {};
    for (let index = 0; index < allUsers.length; index++) {
      const gradesArray = allUsers[index].grades;
      //
      for (let index = 0; index < gradesArray.length; index++) {
        const oneGradeTopic = gradesArray[index];
        if (!emptyObject[oneGradeTopic.subject]) {
          emptyObject[oneGradeTopic.subject] = oneGradeTopic.score;
          // emptyObject[oneGradeTopic.subject] = allUsers[index];
        }
        // console.log(oneGradeTopic.score, "oneGradeTopic.score");
        // console.log(
        //   emptyObject[oneGradeTopic.subject],
        //   "emptyObject[oneGradeTopic.subject]"
        // );
        if (
          emptyObject[oneGradeTopic.subject] &&
          oneGradeTopic.score > emptyObject[oneGradeTopic.subject]
        ) {
          emptyObject[oneGradeTopic.subject] = oneGradeTopic.score;
          // console.log(emptyObject[oneGradeTopic.subject]);
        }
      }
    }

    res.send(emptyObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//age diye - group practice
//with for loop
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyObject = {};
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index];
      if (!emptyObject[element.age]) {
        emptyObject[element.age] = allUsers[index];
      }
    }
    res.send(emptyObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

//group by each subject and highest scorer
//done by gpt
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const output = {};
    //
    allUsers.forEach((item) => {
      item.grades.forEach((grade) => {
        if (
          !output[grade.subject] ||
          output[grade.subject].score < grade.score
        ) {
          output[grade.subject] = {
            subject: grade.subject,
            score: grade.score,
            highestScorer: item.name,
          };
        }
      });
    });

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try10", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try11", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
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
