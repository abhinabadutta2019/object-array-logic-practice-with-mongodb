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
//javascript | Object grouping,with reduce
//dont understand
//collected form stack overflow
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    const ageGroups = allUsers.reduce(function (accumulator, currentValue) {
      //
      const age = currentValue.age;
      //
      if (!accumulator[age]) {
        //
        // console.log(accumulator, "accumulator");
        accumulator[age] = [];
      }
      //
      accumulator[age].push(currentValue);
      console.log(accumulator[age], "accumulator");
      return accumulator;
    }, {});

    //
    res.send(ageGroups);
  } catch (error) {
    res.status(500).send(error);
  }
});
//javascript | Object grouping,with reduce
// not working
//collected form stack overflow
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    function groupBy(collection, property) {
      let i = 0,
        val,
        index,
        values = [],
        result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1) {
          result[index].push(collection[i]);
        } else {
          // values.push(val);
          result[val] = [];
          result[val].push([collection[i]]);
        }
      }
      return result;
    }

    let obj = groupBy(allUsers, "age");
    res.send(obj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//javascript | Object grouping,with foreach
//
router.get("/try4", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let group = {};
    //
    allUsers.forEach(function (oneObj) {
      //group object er - key set--[oneObj.age], ekane-23/ 24/31 ..etc
      let list = group[oneObj.age];
      //
      if (list) {
        list.push(oneObj);
      } else {
        group[oneObj.age] = [oneObj];
      }
    });

    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
router.get("/try5", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //

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
