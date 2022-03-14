const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model("Person", personSchema);

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// });

// if ((process.argv.length = 3)) {
//   console.log("Phonebook: ");
//   Person.find({}).then((result) => {
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     process.exit(1);
//   });
// }

// person.save().then((result) => {
//   console.log("Added", process.argv[3], process.argv[4], "to phonebook");
//   mongoose.connection.close();
// });
