//3rd file related to object groupping
//
// let data = [
//   { name: "Person 1", age: 35 },
//   { name: "Person 2", age: 36 },
//   { name: "Person 3", age: 35 },
//   { name: "Person 4", age: 37 },
//   { name: "Person 5", age: 36 },
// ];

//group them by age property
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
///////////////////////////////////////////////////////////////////////////
//solve
// let output = {};
// //
// for (let index = 0; index < data.length; index++) {
//   const element = data[index].age;
//   //
//   if (!output[element]) {
//     output[element] = [data[index]];
//   } else {
//     output[element].push(data[index]);
//   }
// }

// //
// console.log(output);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Kutti questions- 06-May///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
data2 = [
  { name: "Person 1", age: 35, salary: 1000 },
  { name: "Person 2", age: 36, salary: 2000 },
  { name: "Person 3", age: 35, salary: 3000 },
  { name: "Person 4", age: 37, salary: 4000 },
  { name: "Person 5", age: 36, salary: 3000 },
];
// expected output
//q-- group by age and return the first salary OBJECT-- of that group
// output={
//     35:  { name: 'Person 1', age: 35, salary: 1000 } ,
// 36:{ name: "Person 2", age: 36, salary: 2000 },
//37:{ name: "Person 4", age: 37, salary: 4000 }}
//
//

//// expected output
//q-- group by age and return the highest salary OBJECT -- of that group
// output={
//     35:  { name: "Person 3", age: 35, salary: 3000 } ,
// 36:{ name: "Person 5", age: 36, salary: 3000 },
//37:{ name: "Person 4", age: 37, salary: 4000 }}

// let output = {};
// //
// for (let index = 0; index < data2.length; index++) {
//   const element = data2[index].salary;
//   //   console.log(element);
//   if (!output[element]) {
//     output[element] = [data2[index]];
//   } else {
//     output[element].push(data2[index]);
//   }
// }
// console.log(output);

/////////////////////////////////////////////////////////////////////////////////////
data3 = [
  { name: "Person 1", age: 35, salary: 1000 },
  { name: "Person 2", age: 36, salary: 2000 },
  { name: "Person 3", age: 35, salary: 3000 },
  { name: "Person 4", age: 37, salary: 4000 },
  { name: "Person 5", age: 36, salary: 3000 },
];
// expected output
//q-- group by age and return the highest salary OBJECT-- of that group
// output={
//     35:  { name: 'Person 1', age: 35, salary: 1000 } ,
// 36:{ name: "Person 2", age: 36, salary: 2000 },
//37:{ name: "Person 4", age: 37, salary: 4000 }}
//
//
//////////////////////////////////////////////////////////////////////////////////////
//This solution works
//////////////////
// let outputObject = {};
// //
// for (let index = 0; index < data3.length; index++) {
//   const element = data3[index].age;
//   //
//   if (!outputObject[element]) {
//     outputObject[element] = data3[index];
//   }
//   //if key existing and
//   //if in value-  existing object er salary theke- current object er salary beshi hoi
//   if (
//     outputObject[element] &&
//     data3[index].salary > outputObject[element].salary
//   ) {
//     outputObject[element] = data3[index];
//     console.log("salary changed");
//   }
// }
// console.log(outputObject);
////////////////////////////////////////////////////////////////////////////////////////
data4 = [
  { name: "Person 1", age: 35, salary: 1000 },
  { name: "Person 2", age: 36, salary: 2000 },
  { name: "Person 3", age: 35, salary: 3000 },
  { name: "Person 4", age: 37, salary: 4000 },
  { name: "Person 5", age: 36, salary: 3000 },
];
// expected output
//q-- group by age and return the first salary OBJECT-- of that group
// output={
//     35:  { name: 'Person 1', age: 35, salary: 1000 } ,
// 36:{ name: "Person 2", age: 36, salary: 2000 },
//37:{ name: "Person 4", age: 37, salary: 4000 }}
//
//
//////////////////////////////////////////////////////////////////////////////////////////
let outputObject = {};
//
for (let index = 0; index < data4.length; index++) {
  const ageIndex = data4[index].age;
  // const salaryIndex = data4[index].salary;
  //
  if (!outputObject[ageIndex]) {
    outputObject[ageIndex] = data4[index];
  }
}

console.log(outputObject, "outputObject");
