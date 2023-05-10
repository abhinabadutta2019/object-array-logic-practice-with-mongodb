//////////////////////////////////////////////////
////use 3rd bracket syntax
//////////////////////////////////////////////////
let arr = ["A", "A", "B", "C", "C", "A", "A"];

let outputObject = {};

for (let i = 0; i < arr.length; i++) {
  //   const arr[i] = arr[i];
  if (!outputObject[arr[i]]) {
    outputObject[arr[i]] = [arr[i]];
  }
  //
  if (outputObject[arr[i]]) {
    outputObject[arr[i]].push(arr[i]);
  }
}

console.log(outputObject);
//
//loop through object
// for (const key of Object.keys(outputObject)) {
//   //   console.log(outputObject[key]);
//   outputObject[key] = outputObject[key].length;
// }
// // console.log(outputObject); //{ A: 4, B: 1, C: 2 }
////////////////////////////////////////////////////////////////////
///////////use dot syntax
//////////////////////////////////////////////////////////////////////
// let arr = ["A", "A", "B", "C", "C", "A", "A"];

// let outputObject = {};

// for (let j = 0; j < arr.length; j++) {
//   //   array[j];
//   //dot syntax not working-- jokhon initializing value
//   //   if (!outputObject.arr[j]) {
//   //     // outputObject.arr[j] = []; //ReferenceError: Cannot access 'outputObject' before initialization
//   //   }
//   //
//   //
//   if (!outputObject[arr[j]]) {
//     outputObject[arr[j]] = [];
//   }
//   //
//   if (outputObject[arr[j]]) {
//     outputObject[arr[j]].push(arr[j]);
//   }
// }
// console.log(outputObject, "outputObject");
