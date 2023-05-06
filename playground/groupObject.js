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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

let output = {};
//
for (let index = 0; index < data2.length; index++) {
  const element = data2[index].salary;
  //   console.log(element);
  if (!output[element]) {
    output[element] = [data2[index]];
  } else {
    output[element].push(data2[index]);
  }
}
console.log(output);

/////////////////////////////////////////////////////////////////////////////////////
