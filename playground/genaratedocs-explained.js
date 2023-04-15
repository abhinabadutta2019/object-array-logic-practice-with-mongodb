// Define a function called generateDocs that takes a number parameter
function generateDocs(numDocs) {
  // Create an empty array called docs to hold the generated documents
  const docs = [];
  // Use a loop to generate the desired number of documents
  for (let i = 0; i < numDocs; i++) {
    // Create an object called doc for the current document being generated
    const doc = {
      // Add a property to doc called name, which is a string value representing the name of the person
      name: `Person ${i + 1}`,
      // Add a property to doc called age, which is a random integer between 20 and 69
      age: Math.floor(Math.random() * 50) + 20,
      // Add a property to doc called address, which is an object containing the street address, city, state, and ZIP code
      address: {
        street: `Street ${i + 1}`,
        city: `City ${i + 1}`,
        state: `State ${i + 1}`,
        zip: `${Math.floor(Math.random() * 90000) + 10000}`,
      },
      // Add a property to doc called grades, which is an empty array
      grades: [],
    };
    // Use another loop to generate 5 grades for the current document
    for (let j = 0; j < 5; j++) {
      // Create an object representing the current grade, with a subject and score
      const grade = {
        subject: `Subject ${j + 1}`,
        score: Math.floor(Math.random() * 101),
      };
      // Add the grade object to the grades array for the current document
      doc.grades.push(grade);
    }
    // Add the completed document object to the docs array
    docs.push(doc);
  }
  // Return the array of generated documents
  return docs;
}

////////////

// //
// const docs = generateDocs(200);
// User.insertMany(docs)
//   .then(() => console.log("Documents inserted successfully"))
//   .catch((err) => console.error("Error inserting documents", err));
//////////////////////////////////////////////////////////////////////////////////////////////////
// FAQ

//Q-so how many subjects each has, is the number of subjects constant or random?

// Each document has a fixed number of five subjects. The inner loop runs five times, creating a grade object for each of the five subjects and pushing it into the grades array of the current document. The subject is generated as a string with the format "Subject j" where j is the index of the subject in the loop. Therefore, each document has five subjects with names "Subject 1" through "Subject 5". The score for each subject is generated randomly using Math.floor(Math.random() * 101), which generates a random integer between 0 and 100.

//-------------------------------------------------------------------------

//Q- in this code-- after the data gets generated by--generateDocs(numDocs) function----is it recommended to comment out this part?  ---in model/user.js

//It depends on what you want to do with the data generated by the generateDocs function.

// If you have already inserted the data into your MongoDB database using the User.insertMany(docs) method, and you don't need to insert the same data again, then it may be a good idea to comment out the code that generates and inserts the data. This will prevent accidentally duplicating the data in the database.

// However, if you want to continue to use the generateDocs function to generate new data or modify it in some way, then you should not comment out the code that calls the function and inserts the data.

// In general, it's a good practice to comment out code that is not being used, especially if it performs actions like inserting data into a database, to avoid unintended consequences.
//-----------------------------------------------------------------------------
