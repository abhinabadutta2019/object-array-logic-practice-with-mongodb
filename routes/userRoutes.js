const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();

//
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log(typeof allUsers);
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

////age grater than 67

router.get("/test1", async (req, res) => {
  try {
    const users = await User.find({ age: { $gt: 67 } });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//age grater than & equal-to 67
router.get("/test2", async (req, res) => {
  try {
    const users = await User.find({ age: { $gte: 67 } });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//age less than & equal-to 21

router.get("/test3", async (req, res) => {
  try {
    const users = await User.find({ age: { $lte: 21 } });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

//age is less than 25 and greater than 22
router.get("/test4", async (req, res) => {
  try {
    const users = await User.find({ age: { $gt: 22, $lt: 25 } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question--- age is  27
router.get("/test5", async (req, res) => {
  try {
    const users = await User.find({ age: 27 });
    res.send(users);
  } catch (e) {
    res.send(e);
  }
});

////////////////////////////////////
//regex
/////////////////////////////
//question-- name ends with 9
router.get("/test6", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /9$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- name ends with 10
router.get("/test7", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /10$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- second last item in name string is 2
router.get("/test8", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /.2.$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- name starts with P
router.get("/test9", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /^P/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- second item in name string is e

router.get("/test10", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /^.e/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- third item in name string is r
router.get("/test11", async (req, res) => {
  try {
    const users = await User.find({ name: /^.{2}r/ });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- name starts with Per
router.get("/test12", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /^Per/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question --- 3rd last in name string is '2'
router.get("/test13", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: /.2..$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//
/////////////////////////////////////////////////////////////////
//regex with zip
////////////////////////////////////////////////////////////////
//question-- zip starts with 5
router.get("/reg1", async (req, res) => {
  try {
    const users = await User.find({ "address.zip": { $regex: /^5/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- zip starts with 157
router.get("/reg2", async (req, res) => {
  try {
    const users = await User.find({ "address.zip": { $regex: /^157/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//question-- zip ends with 719
router.get("/reg4", async (req, res) => {
  try {
    const users = await User.find({ "address.zip": { $regex: /719$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//second last item

router.get("/reg5", async (req, res) => {
  try {
    //question --- 3rd last in name string is '2'
    // const users = await User.find({ "address.zip": { $regex: /.2..$/ } });
    //2nd last 1, 4th last 5, 5th last 1
    const users = await User.find({ "address.zip": { $regex: /15.1.$/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//start theke 2nd position e 5 , 3rd e 7
router.get("/reg6", async (req, res) => {
  try {
    //second item is 5, 3rd is 7
    const users = await User.find({ "address.zip": { $regex: /^.57./ } });
    //eta deleo uporertar moto same result e asche
    // const users = await User.find({ "address.zip": { $regex: /^.57/ } });
    // from the start 2nd position is 5m 4th position is 1
    // const users = await User.find({ "address.zip": { $regex: /^.5.1/ } });
    //second item is 1
    // const users = await User.find({ "address.zip": { $regex: /^.{2}1/ } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/////////////////////////////////////////
//regex case sensetive noi
/////////////////////////////////////////
//name starts with capital P or small p--- i -- makes it case insensative
router.get("/case1", async (req, res) => {
  try {
    //name starts with capital P or small p--- i -- makes it case insensative
    // const users = await User.find({ name: { $regex: /^p/i } });
    //
    const users = await User.find({ name: { $regex: /^p/i } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
