const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////////

// kutti explained filter with different object
// For loop
// -
// -
// const finalStudents = [];

// for (let i = 0; i < arr.length; i++) {
//     const student = arr[i];

//     const mathScore = -1;
//     const englishScore = -1;

//     for (let j = 0; j < student.scores.length; j++) {
//         const score = student.scores[j];
//         if (score.subject === 'Math') {
//             mathScore = score.score;
//         } else if (score.subject === 'English') {
//             englishScore = score.score;
//         }
//     }

//     if (mathScore >= 80 && englishScore >= 80) {
//         finalStudents.push(student);
//     }
// }

// -
// -
// -
// Filter Process 1
// -
// -
// -
// const finalStudents2 = arr.filter((student) => {
//     const mathScore = -1 //const na let hobe
//     const englishScore = -1;//const na let hobe
//     student.scores.forEach((score) => {
//         if (score.subject === 'Math') {
//             mathScore = score.score;
//         } else if (score.subject === 'English') {
//             englishScore = score.score;
//         }
//     })

//     if (mathScore >= 80 && englishScore >= 80) {
//         return true;
//     }
// });

// -
// -

// —---
// —--
// Filter Process 2
// —-

// const finalStudents3 = arr.filter((student) => {
//     const gradesArray = student.scores;
//     //[]
//     // [{}]
//     const mathScore = gradesArray.filter((subject) => {
//         if (subject.subject === 'Math' && subject.score >= 80) {
//             return true;
//         }
//     });
//     //[]
//     // [{}]
//     const englishScore = gradesArray.filter((subject) => {
//         return subject.subject === 'English' && subject.score >= 80;
//     });

//     return mathScore.length > 0 && englishScore.length > 0;
// });

// —
// -

// -
// -
// const finalStudents4 = arr.filter((student) => {
//     const gradesArray = student.scores;

//     // [{}]
//     const mathScore = gradesArray.filter((subject) => {
//         return subject.subject === 'Math';
//     });

//     // [{}]
//     const englishScore = gradesArray.filter((subject) => {
//         return subject.subject === 'English';
//     });

//     if (mathScore[0].score >= 80 && englishScore[0].score >= 80) {
//         return true;
//     }
// });

//

//if mathscore less than 5, filter method
router.get("/try1", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //

    const finalStudentArray = allUsers.filter(function (student) {
      //
      let topicFirst = -1;

      //
      // return student;
      student.grades.forEach(function (topic) {
        // console.log(topic, "topic1");
        //
        if (topic.subject === "Subject 1") {
          topicFirst = topic.score;

          // console.log(topicFirst);
        }
      });
      //ei part ta important
      if (topicFirst < 5) {
        return true;
      }
    });

    // res.send();
    res.send(finalStudentArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

//if Subject1 score less than 5, and if Subject2 score lless than 35 , filter method
router.get("/try2", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let finalFilterd = allUsers.filter(function (student) {
      //
      let gradesArray = student.grades;
      //Subject 1
      let subjectAndScore = gradesArray.filter(function (subject) {
        //
        if (subject.subject === "Subject 1" && subject.score <= 5) {
          //
          return true;
        }
      });

      //Subject 2
      let subjectAndScore2 = gradesArray.filter(function (subject) {
        //
        if (subject.subject === "Subject 2" && subject.score <= 35) {
          //
          return true;
        }
      });

      //
      // console.log(subjectAndScore2);
      return subjectAndScore2.length > 0 && subjectAndScore.length > 0;
    });

    res.send(finalFilterd);
  } catch (error) {
    res.status(500).send(error);
  }
});

//if Subject1 score less than 5,
router.get("/try3", async (req, res) => {
  try {
    const allUsers = await User.find({});
    //
    let finalArray = allUsers.filter(function (student) {
      //
      let gradesArray = student.grades;
      //
      let subject1Score = gradesArray.filter(function (params) {
        return params.subject === "Subject 1";
      });
      //
      // console.log(subject1Score);
      if (subject1Score[0].score < 5) {
        return true;
      }
    });
    res.send(finalArray);
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
