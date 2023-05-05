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
//Find all the persons who have an odd age and have scored less than 70 in all subjects.
//filter related
//solved with filter + reduce
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let filteredArray = allUsers.filter(function (oneObj) {
      //
      let gradesArray = oneObj.grades;
      //
      let innerFilter = gradesArray.reduce(function (
        accumulator,
        currentValue
      ) {
        return accumulator + currentValue.score;
      },
      0);
      //
      // console.log(innerFilter, "innerFilter");
      //
      return innerFilter < 150 && oneObj.age % 2 == 0;
    });
    //
    res.send(filteredArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//

//Find all the persons who have an odd age and have scored less than 70 in all subjects.
//with for loop
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index].grades;
      //
      let totalScore = 0;
      for (let index = 0; index < element.length; index++) {
        const oneGradeArray = element[index];
        totalScore = totalScore + oneGradeArray.score;
      }
      if (totalScore < 150 && allUsers[index].age % 2 == 0) {
        emptyArray.push(allUsers[index]);
      }
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have an odd age and have scored less than 70 in all subjects.
// forEach loop
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let totalScore = 0;
      //
      gradesArray.forEach(function (oneTopic) {
        totalScore = totalScore + oneTopic.score;
      });
      if (totalScore < 150 && oneObj.age % 2 == 0) {
        emptyArray.push(oneObj);
      }
    });

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have scored less than 30 in "Subject 1" and have not scored less than 80 in "Subject 4"
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let filterArray = allUsers.filter(function (eachObj) {
      let gradesArray = eachObj.grades;
      //
      let innerFilter = gradesArray.filter(function (eachTopic) {
        if (eachTopic.subject === "Subject 1" && eachTopic.score < 30) {
          return true;
        }
      });
      // console.log(innerFilter);
      //
      let twoFilterArray = gradesArray.filter(function (oneSub) {
        if (oneSub.subject === "Subject 4" && oneSub.score > 80) {
          return true;
        }
      });
      return innerFilter.length > 0 && twoFilterArray.length > 0;
    });
    res.send(filterArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have scored less than 30 in "Subject 1" and have not scored less than 80 in "Subject 4"
//for loop
//onnekta brute force e hoyeche -- niche -- easier solve ache
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let subject1Array = [];
    for (let index = 0; index < allUsers.length; index++) {
      let element = allUsers[index].grades;
      //
      //
      for (let j = 0; j < element.length; j++) {
        let oneTopic = element[j];
        //
        if (oneTopic.subject === "Subject 1" && oneTopic.score < 30) {
          subject1Array.push(allUsers[index]);
        }
      }
      // console.log(subject1Array);
    }
    let finalArray = [];
    //
    for (let p = 0; p < subject1Array.length; p++) {
      let secondElement = subject1Array[p].grades;
      //
      for (let k = 0; k < secondElement.length; k++) {
        let oneBranch = secondElement[k];
        //
        if (oneBranch.subject === "Subject 4" && oneBranch.score > 80) {
          finalArray.push(subject1Array[p]);
        }
      }
    }
    res.send(finalArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//solved by gpt
router.get("/try61", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let result = [];
    // loop through each user
    for (let i = 0; i < allUsers.length; i++) {
      let user = allUsers[i];
      let grades = user.grades;
      let subject1Score = null;
      let subject4Score = null;
      // loop through each grade of the user
      for (let j = 0; j < grades.length; j++) {
        let grade = grades[j];
        if (grade.subject === "Subject 1") {
          subject1Score = grade.score;
        }
        if (grade.subject === "Subject 4") {
          subject4Score = grade.score;
        }
      }
      // check if user satisfies the conditions
      if (
        subject1Score !== null &&
        subject1Score < 30 &&
        subject4Score !== null &&
        subject4Score >= 80
      ) {
        result.push(user);
      }
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
////Find all the persons who have scored less than 30 in "Subject 1" and have not scored less than 80 in "Subject 4"
//for loop
router.get("/try7", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    //
    for (let i = 0; i < allUsers.length; i++) {
      // let oneObj = array[i];
      let oneGradeArray = allUsers[i].grades;
      let subject1Score = -1;
      let subject4Score = -1;
      //
      for (let j = 0; j < oneGradeArray.length; j++) {
        const oneTopic = oneGradeArray[j];
        //
        if (oneTopic.subject === "Subject 1" && oneTopic.score < 30) {
          subject1Score = oneTopic.score;
        }
        //
        if (oneTopic.subject === "Subject 4" && oneTopic.score > 80) {
          subject4Score = oneTopic.score;
        }
      }
      //
      if (subject1Score > -1 && subject4Score > -1) {
        //
        emptyArray.push(allUsers[i]);
      }
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have scored less than 30 in "Subject 1" and have not scored less than 80 in "Subject 4"
//forEach loop
router.get("/try8", async (req, res) => {
  try {
    const allUsers = await User.find({});

    let emptyArray = [];
    //
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      let subject1Score = -1;
      let subject4Score = -1;
      //
      gradesArray.forEach(function (oneTopic) {
        if (oneTopic.subject === "Subject 1" && oneTopic.score < 30) {
          subject1Score = oneTopic.score;
        }
        //
        if (oneTopic.subject === "Subject 4" && oneTopic.score > 80) {
          subject4Score = oneTopic.score;
          // console.log(subject4Score);
        }
      });
      // console.log(subject1Score);
      //
      if (subject1Score > -1 && subject4Score > -1) {
        // console.log(oneObj);
        emptyArray.push(oneObj);
      }
    });
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
