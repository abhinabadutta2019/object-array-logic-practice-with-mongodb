//4th file related to groupping
//solve using foreach
let data = [
  { name: "Person 1", age: 35 },
  { name: "Person 2", age: 36 },
  { name: "Person 3", age: 35 },
  { name: "Person 4", age: 37 },
  { name: "Person 5", age: 36 },
];
/////////////////////////////////////////////////////////
let data2 = [
  { name: "Person 1", age: 35, salary: 1000 },
  { name: "Person 2", age: 36, salary: 2000 },
  { name: "Person 3", age: 35, salary: 3000 },
  { name: "Person 4", age: 37, salary: 4000 },
  { name: "Person 5", age: 36, salary: 3000 },
];

//////////////////////////////////////////////////////////
//// expected output
//q3-- group by age and return the highest salary OBJECT -- of that group
// output={
//     35:  { name: "Person 3", age: 35, salary: 3000 } ,
// 36:{ name: "Person 5", age: 36, salary: 3000 },
//37:{ name: "Person 4", age: 37, salary: 4000 }}

///////////////////////////////////////////////////////////

// solve

let outputObject = {};
//
data2.forEach(function (item) {
  if (!outputObject[item.age]) {
    outputObject[item.age] = item;
  }
  if (outputObject[item.age] && item.salary > outputObject[item.age].salary) {
    outputObject[item.age] = item;
  }
});
console.log(outputObject, "outputObject");
///////////////////////////////////////////////////////////

// // expected output
// //q2-- group by age and return the first salary OBJECT-- of that group
// // output={
// //     35:  { name: 'Person 1', age: 35, salary: 1000 } ,
// // 36:{ name: "Person 2", age: 36, salary: 2000 },
// //37:{ name: "Person 4", age: 37, salary: 4000 }}
// //
// //
// ///////////////////////////////////////////////////////////
// //solve

// let outputObject = {};
// data2.forEach(function (item) {
//   if (!outputObject[item.age]) {
//     outputObject[item.age] = item;
//   }
// });
// console.log(outputObject);
///////////////////////////////////////////////

//q1
// output = {
//     35: [
//       { name: "Person 1", age: 35 },
//       { name: "Person 3", age: 35 },
//     ],
//     36: [
//       { name: "Person 2", age: 36 },
//       { name: "Person 5", age: 36 },
//     ],
//     37: [{ name: "Person 4", age: 37 }],
//   };

// let outputObject = {};

// data.forEach(function (item) {
//   //   console.log(item.age);
//   if (!outputObject[item.age]) {
//     outputObject[item.age] = [item];
//   } else {
//     outputObject[item.age].push(item);
//   }
// });

// console.log(outputObject);
