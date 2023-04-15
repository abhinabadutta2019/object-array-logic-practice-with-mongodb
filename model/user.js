const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  grades: [
    {
      subject: String,
      score: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const streets = Array.from({ length: 100 }, (_, i) => `Street ${i + 1}`);
// const cities = Array.from({ length: 50 }, (_, i) => `City ${i + 1}`);
// const states = Array.from({ length: 20 }, (_, i) => `State ${i + 1}`);
// const zipcodes = Array.from(
//   { length: 100 },
//   (_, i) => `${Math.floor(Math.random() * 90000) + 10000}`
// );

// const generateDocs = (numDocs) => {
//   const docs = [];
//   for (let i = 0; i < numDocs; i++) {
//     const street = streets[getRandomInt(0, streets.length - 1)];
//     const city = cities[getRandomInt(0, cities.length - 1)];
//     const state = states[getRandomInt(0, states.length - 1)];
//     const zipcode = zipcodes[getRandomInt(0, zipcodes.length - 1)];
//     const doc = {
//       name: `Person ${i + 1}`,
//       age: Math.floor(Math.random() * 50) + 20,
//       address: {
//         street,
//         city,
//         state,
//         zip: zipcode,
//       },
//       grades: [],
//     };
//     for (let j = 0; j < 5; j++) {
//       doc.grades.push({
//         subject: `Subject ${j + 1}`,
//         score: Math.floor(Math.random() * 101),
//       });
//     }
//     docs.push(doc);
//   }
//   return docs;
// };

// const docs = generateDocs(200);
// User.insertMany(docs)
//   .then(() => console.log("Documents inserted successfully"))
//   .catch((err) => console.error("Error inserting documents", err));

module.exports = User;
