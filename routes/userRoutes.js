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
//dynamic key creation
//value compare
//this is correct way -- niche other bloated example ache
router.get("/try100", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const grade = gradesArray[j];
        //
        if (!outputObject[grade.subject]) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
        }
        //
        if (
          outputObject[grade.subject] &&
          grade.score > outputObject[grade.subject]
        ) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
        }
      }
    }
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

//done with foreach
//shorter--- done with for each- without loop to compare keyname
//surprinsingly this working
router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    allUsers.forEach(function (oneObj) {
      const gradesArray = oneObj.grades;
      //
      gradesArray.forEach(function (grade) {
        //
        if (!outputObject[grade.subject]) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = oneObj.name;
        }
        //
        //kutti --
        // console.log([grade.subject], "1");
        // console.log([grade["subject"]], "2");
        //
        if (
          outputObject[grade.subject] &&
          grade.score > outputObject[grade.subject]
        ) {
          // console.log(grade.subject);
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = oneObj.name;
        }
      });
    });
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

//group Subject 1, highest score and highest scorer
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    allUsers.forEach(function (oneObj) {
      const gradesArray = oneObj.grades;
      //
      gradesArray.forEach(function (grade) {
        // console.log(grade);
        if (!outputObject["Subject 1"]) {
          outputObject["Subject 1"] = {
            score: 0,
            scorer: "",
            _id: "",
          };
        }
        //
        if (
          grade.subject === "Subject 1" &&
          grade.score > outputObject["Subject 1"].score
        ) {
          (outputObject["Subject 1"].score = grade.score),
            (outputObject["Subject 1"].scorer = oneObj.name);
          outputObject["Subject 1"]._id = oneObj._id;
        }
      });
      // return true;
    });
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

////done by gpt
//not giving corrert result--
//would try this process
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const output = {};

    for (let i = 0; i < allUsers.length; i++) {
      const item = allUsers[i];
      for (let j = 0; j < item.grades.length; j++) {
        const grade = item.grades[j];
        if (
          !output[grade.subject] ||
          output[grade.subject].score < grade.score
        ) {
          output[grade.subject] = {
            [`subject ${grade.subject} highest score`]: grade.score,
            [`subject ${grade.subject} highest scorer`]: item.name,
          };
        }
      }
    }

    res.send(Object.values(output));
  } catch (error) {
    res.status(500).send(error);
  }
});
//key name diye conmpare kore
//output object with dynamic name (to some extent)
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const grade = gradesArray[j];
        //

        if (!outputObject[grade.subject]) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
        }
        for (const [key, value] of Object.entries(outputObject)) {
          if (key === grade.subject && value < grade.score) {
            // console.log("Hi");
            outputObject[grade.subject] = grade.score;
            outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
          }
          // console.log(key);
          // console.log(value);
        }
      }
      // break;
    }
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

//done with foreach loop
//with loop to compare
router.get("/try9", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    allUsers.forEach(function (oneObj) {
      const gradesArray = oneObj.grades;
      //
      gradesArray.forEach(function (grade) {
        //
        if (!outputObject[grade.subject]) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = oneObj.name;
        }

        // this part working--
        for (const [key, value] of Object.entries(outputObject)) {
          if (
            key === grade.subject &&
            grade.score > outputObject[grade.subject]
          ) {
            outputObject[grade.subject] = grade.score;
            outputObject[`${grade.subject} highest scorer`] = oneObj.name;
          }
        }
      });
    });
    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const grade = gradesArray[j];
        //
        if (!outputObject[grade.subject]) {
          outputObject[grade.subject] = grade.score;
          outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
        }
        //
        for (const [key, value] of Object.entries(outputObject)) {
          // console.log(key, value);
          if (key === grade.subject && grade.score > value) {
            outputObject[key] = grade.score;
            outputObject[`${grade.subject} highest scorer`] = allUsers[i].name;
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
router.get("/try16", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
//
//group highest score in subject 2
//done by me
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let index = 0; index < allUsers.length; index++) {
      const gradesArray = allUsers[index].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const oneTopic = gradesArray[j];
        // console.log(oneTopic, "oneTopic");
        if (!outputObject["Subject 2"] && oneTopic.subject === "Subject 2") {
          outputObject["Subject 2"] = oneTopic.score;
        }
        //
        if (
          oneTopic.subject === "Subject 2" &&
          oneTopic.score > outputObject["Subject 2"]
        ) {
          outputObject["Subject 2"] = oneTopic.score;
        }
      }
      // break;
    }

    res.send(outputObject);
  } catch (error) {
    res.status(500).send(error);
  }
});
//group Subject 1, highest score and highest scorer
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputObject = {};
    //
    for (let i = 0; i < allUsers.length; i++) {
      const gradesArray = allUsers[i].grades;
      //
      for (let j = 0; j < gradesArray.length; j++) {
        const oneTopic = gradesArray[j];
        //
        if (!outputObject["Subject 1"]) {
          outputObject["Subject 1"] = { score: 0, scorerName: "", _id: "" };
        }
        //
        if (
          oneTopic.subject === "Subject 1" &&
          oneTopic.score > outputObject["Subject 1"].score
        ) {
          // console.log("HI");
          outputObject["Subject 1"].score = oneTopic.score;
          outputObject["Subject 1"].scorerName = allUsers[i].name;
          outputObject["Subject 1"]._id = allUsers[i]._id;
        }
      }
      // break;
    }

    res.send(outputObject);
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
