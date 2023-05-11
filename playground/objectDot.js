//solved by kutti
/////////////////////////////////////////////////////////
let arr = ["A", "A", "B", "C", "C", "A", "A"];

let outputObject = {};

for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  //
  if (!outputObject[element]) {
    outputObject[element] = 1;
    // console.log(i, "i value");
  } else if (outputObject[element]) {
    outputObject[element] = outputObject[element] + 1;
    // console.log(i, "block 2 -i value");
  }
  //
}
console.log(outputObject, "outputObject");

//////////////////////////////////////////////////
////eta correct precess noi-- dubar if block -- wrong-
//////////////////////////////////////////////////
// let arr = ["A", "A", "B", "C", "C", "A", "A"];

// let outputObject = {};

// for (let i = 0; i < arr.length; i++) {
//   //   const arr[i] = arr[i];
//   if (!outputObject[arr[i]]) {
//     outputObject[arr[i]] = 1; //etai right side e '1' er jagai '0' rakhle -- porer if block e dhukche na ( as 0= false)
//     //aar eta 1 korle --1ta kore extra count asche
//     //{ A: 5, B: 2, C: 3 } outputObject--- answer asche--( not correct)
//     //{ A: 4, B: 1, C: 2 } asbar kotha
//   }
//   // console.log(outputObject[arr[i]]);

//   // outputObject[arr[i]] + 1;// this syntax not working
//   //
//   if (outputObject[arr[i]]) {
//     // console.log("Hi");
//     // console.log(outputObject[arr[i]], "outputObject[arr[i]]");
//     outputObject[arr[i]] = outputObject[arr[i]] + 1; //
//   }
//   // console.log(arr[i]);
// }

// console.log(outputObject, "outputObject");
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// let myArr = ["A", "A", "B", "C", "C", "A", "A"];

// let myOutput = {};

// //
// for (let j = 0; j < myArr.length; j++) {
//   // console.log(myArr[j], "myArr[j]");
//   if (!myOutput[myArr[j]]) {
//     myOutput[myArr[j]] = { counter: 0 };
//   }
//   //
//   if (myOutput[myArr[j]]) {
//     myOutput[myArr[j]].counter = myOutput[myArr[j]].counter + 1;
//   }
// }
// //
// console.log(myOutput, "myOutput"); //{ A: { counter: 4 }, B: { counter: 1 }, C: { counter: 2 } } myOutput
///////////////////////////////////////////////////////////////////////////////
