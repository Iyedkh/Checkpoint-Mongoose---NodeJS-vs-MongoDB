const mongoose = require('mongoose');

// Define the schema for Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

// Create the model from schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
