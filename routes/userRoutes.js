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
//

// sudhu 2 to subject e 20 er kom -
//with filter method
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outerFilter = allUsers.filter(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let innerArray = gradesArray.filter(function (oneTopic) {
        if (oneTopic.score < 5) {
          return true;
        }
      });
      // console.log(innerArray, "innerArray");
      // console.log(innerArray.length);
      return innerArray.length === 2;
    });

    res.send(outerFilter);
  } catch (error) {
    res.status(500).send(error);
  }
});

// sudhu 0 theke 2 to subject e 20 er kom -
//with for loop

router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    //
    for (let i = 0; i < allUsers.length; i++) {
      let element = allUsers[i].grades;
      //
      let filterLessThan = [];
      //
      for (let j = 0; j < element.length; j++) {
        let oneItem = element[j];
        //
        if (oneItem.score < 7) {
          filterLessThan.push(oneItem);
        }
      }
      if (filterLessThan.length > 0 && filterLessThan.length < 3) {
        emptyArray.push(allUsers[i]);
      }
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
// sudhu 2 to subject e 20 er kom -
//forEach method
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let lessThanCutOff = 0;
      gradesArray.forEach(function (oneTopic) {
        //
        if (oneTopic.score < 6) {
          lessThanCutOff = lessThanCutOff + 1;
        }
      });
      if (lessThanCutOff === 2) {
        emptyArray.push(oneObj);
      }
    });

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 50 in any subject.
//filter method
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outerFilter = allUsers.filter(function (oneObj) {
      let gradesArray = oneObj.grades;
      //

      let innerArray = gradesArray.filter(function (oneItem) {
        if (oneItem.score < 50) {
          return true;
        }
      });
      // console.log(innerArray.length);
      if (innerArray.length === 0) {
        return true;
      }
    });
    res.send(outerFilter);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 50 in any subject.
//forloop method
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let emptyArray = [];
    for (let i = 0; i < allUsers.length; i++) {
      const element = allUsers[i].grades;
      //
      let cutOffArray = [];
      //
      for (let j = 0; j < element.length; j++) {
        const oneItem = element[j];
        //
        if (oneItem.score < 46) {
          cutOffArray.push(oneItem);
        }
      }
      if (cutOffArray.length === 0) {
        emptyArray.push(allUsers[i]);
      }
    }

    res.send(emptyArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Find all the persons who have not scored less than 50 in any subject.
//foreach method
router.get("/try6", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let emptyArray = [];
    //
    allUsers.forEach(function (oneObj) {
      let gradesArray = oneObj.grades;
      //
      let cutOff = 0;
      //
      gradesArray.forEach(function (oneItem) {
        //
        if (oneItem.score < 46) {
          cutOff = cutOff + 1;
        }
      });
      if (cutOff === 0) {
        emptyArray.push(oneObj);
      }
    });

    res.send(emptyArray);
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
