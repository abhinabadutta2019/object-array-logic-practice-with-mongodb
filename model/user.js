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

// function generateDocs(numDocs) {
//   const docs = [];
//   for (let i = 0; i < numDocs; i++) {
//     const doc = {
//       name: `Person ${i + 1}`,
//       age: Math.floor(Math.random() * 50) + 20,
//       address: {
//         street: `Street ${i + 1}`,
//         city: `City ${i + 1}`,
//         state: `State ${i + 1}`,
//         zip: `${Math.floor(Math.random() * 90000) + 10000}`,
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
// }
// //
// const docs = generateDocs(200);
// User.insertMany(docs)
//   .then(() => console.log("Documents inserted successfully"))
//   .catch((err) => console.error("Error inserting documents", err));

module.exports = User;
