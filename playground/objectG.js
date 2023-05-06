let data = [
  { name: "Person 1", age: 35 },
  { name: "Person 2", age: 36 },
  { name: "Person 3", age: 35 },
  { name: "Person 4", age: 37 },
  { name: "Person 5", age: 36 },
];
//
data2 = [
  { name: "Person 1", age: 35, salary: 1000 },
  { name: "Person 2", age: 36, salary: 2000 },
  { name: "Person 3", age: 35, salary: 3000 },
  { name: "Person 4", age: 37, salary: 4000 },
  { name: "Person 5", age: 36, salary: 3000 },
];

//data 2 another question expected output
// output = [35: {name:person1, age:35}, 36: {}, 37:{}]
//
//expected output
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
let output = {};

const key = "age";
output[key] = [];
output[key].push("Abhi"); //{ '35': [ 'Abhi' ] }
//
output[key].push("Loki");

console.log(output["age"], "1");

//
console.log(output["age"] != null, "2");

//
// if (output["age"] == true) {
//   console.log("Hi");
// }
////////////////////////////
//kutti check syntax
console.log(output["age"] != null, "3");
console.log(output["age"] != undefined, "4");

console.log(!output["age"], "5");
console.log(!output["age"] === true, "6");
