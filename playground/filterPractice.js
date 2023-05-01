// const grades = [
//   [85, 76, 92, 81],
//   [72, 91, 65, 88],
//   [94, 89, 76, 93],
//   [81, 68, 77, 85],
//   [59, 83, 72, 78],
// ];

//we have an array of arrays representing student grades on four exams. We want to find all students who did not score at least a 80 on Exam 1

// let filterArray = grades.filter(function (eachBud) {
//   //   console.log(eachBud, "eachBud");

//   return !(eachBud[0] > 80);
// });

// console.log(filterArray);
// //[ [ 72, 91, 65, 88 ], [ 59, 83, 72, 78 ] ]

///////////////////////////////////////////////////////////////

//we have an array of arrays representing student grades on four exams. We want to find all students who did not score at least a 70 on all item

let outerFilter = grades.filter(function (eachArray) {
  let oneItemFilter = eachArray.filter(function (item) {
    return item < 70;
  });
  console.log(oneItemFilter);
  return !(oneItemFilter.length === 0);
});

console.log(outerFilter, "outerFilter");
// [ [ 72, 91, 65, 88 ], [ 81, 68, 77, 85 ], [ 59, 83, 72, 78 ] ]
////////////////////////////////////////////////////////////////////
