data = [
  { name: "Person 1", age: 35 },
  { name: "Person 2", age: 36 },
  { name: "Person 3", age: 35 },
  { name: "Person 4", age: 37 },
  { name: "Person 5", age: 36 },
];

//

//
let output = {};

for (let index = 0; index < data.length; index++) {
  const element = data[index];
  //
  let key = data[index].age;
  // console.log(key, "key");
  // console.log(output[key], "output[key]");
  // console.log(output["age"], "output[age]");
  // //
  // console.log(element[key], "element[key]");
  // console.log(element["age"], "element[age]");
  //

  if (!output[key] === true) {
    // console.log("Hi");
    // console.log(data[index].age);
    // output[index].age;
    output[key] = [data[index]];
  } else {
    output[key].push(data[index]);
  }
  //ekbar ghure jate bondo hoi, just 0th time
}

//
console.log(output);
