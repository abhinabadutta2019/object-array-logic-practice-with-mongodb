let data = [
  {
    name: "Display",
    group: "Technical detals",
    id: "60",
    value: "4",
  },
  {
    name: "Manufacturer",
    group: "Manufacturer",
    id: "58",
    value: "Apple",
  },
  {
    name: "OS",
    group: "Technical detals",
    id: "37",
    value: "Apple iOS",
  },
];

// let groups2 = {};
// data.forEach(function (item) {
//   let list = groups2[item.group];
//   //
//   //   console.log([item.group], "[item.group] 2");
//   //   console.log(groups2, "groups2");
//   //   console.log(list, "list");
//   if (list) {
//     list.push(item);
//   } else {
//     groups2[item.group] = [item];
//     //
//     // console.log([item.group], "[item.group] 1");
//   }
// });

//with reduce method

// const groups = data.reduce(function (accumulator, currentValue) {
//   const group = currentValue.group;

//   if (Object.keys(accumulator).includes(group)) {
//     return accumulator;
//   } else {
//     accumulator[group] = data.filter(function (g) {
//       return g.group === group;
//     });

//     return accumulator;
//   }
// }, {});

// console.log(groups);

//
const groups = data.reduce((acc, curr) => {
  const group = curr.group;

  // Check if the group already exists in the accumulator
  let groupExists = false;
  for (let key in acc) {
    if (key === group) {
      groupExists = true;
      break;
    }
  }

  if (!groupExists) {
    const groupObjects = data.filter((obj) => obj.group === group);
    acc[group] = groupObjects;
  }

  return acc;
}, {});

console.log(groups);
