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

//break foreach loop( some)
router.get("/try12", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputArray = [];
    allUsers.some(function (oneObj) {
      outputArray.push(oneObj.name);
      return true;
    });
    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//
//break foreach( every method)
router.get("/try157", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputArray = [];
    allUsers.every(function (oneObj, index) {
      outputArray.push(oneObj.name);
      return index !== 0; // Break after second iteration
    });
    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//break foreach loop( after second itaration)
router.get("/try155", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputArray = [];
    let iteration = 0;
    allUsers.forEach(function (oneObj) {
      //after second itaration
      if (iteration === 2) {
        return;
      }
      outputArray.push(oneObj.name);
      iteration++;
    });
    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//break for loop- inside-route
router.get("/try13", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let outputArray = [];
    for (let index = 0; index < allUsers.length; index++) {
      const oneObj = allUsers[index];
      outputArray.push(oneObj.name);
      break;
    }
    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//break for loop,, after second iteration
router.get("/try14", async (req, res) => {
  try {
    const allUsers = await User.find({});
    let outputArray = [];
    for (let index = 0; index < allUsers.length; index++) {
      const oneObj = allUsers[index];
      outputArray.push(oneObj.name);
      //
      if (index >= 1) {
        break; // break after second iteration
      }
    }

    res.send(outputArray);
  } catch (error) {
    res.status(500).send(error);
  }
});
//

//

//
router.get("/try16", async (req, res) => {
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
