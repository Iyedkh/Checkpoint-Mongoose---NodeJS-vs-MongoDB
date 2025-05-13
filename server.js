// Load environment variables from .env
require('dotenv').config();

// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error', err));

// Import the Person model
const Person = require('./models/Person');

// ========== CREATE AND SAVE A PERSON ==========

const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "John Doe",
      age: 30,
      favoriteFoods: ["pizza", "sushi"]
    });

    const savedPerson = await person.save();
    console.log("Saved person:", savedPerson);
  } catch (err) {
    console.error("Error saving person:", err);
  }
};

// ========== CREATE MANY PEOPLE ==========

const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("Saved people:", people);
  } catch (err) {
    console.error("Error creating people:", err);
  }
};

// ========== FIND PEOPLE BY NAME ==========

const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log(`People named ${name}:`, people);
  } catch (err) {
    console.error(err);
  }
};

// ========== FIND ONE PERSON BY FAVORITE FOOD ==========

const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(`Person who likes ${food}:`, person);
  } catch (err) {
    console.error(err);
  }
};

// ========== FIND PERSON BY ID ==========

const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Found by ID:', person);
  } catch (err) {
    console.error(err);
  }
};

// ========== CLASSIC UPDATE (FIND, EDIT, SAVE) ==========

const addFoodAndSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    console.log('Updated with hamburger:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

// ========== FIND ONE AND UPDATE ==========

const updateAgeByName = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('Updated age:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

// ========== DELETE BY ID ==========

const deletePersonById = async (personId) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(personId);
    console.log('Deleted person:', deletedPerson);
  } catch (err) {
    console.error(err);
  }
};

// ========== DELETE MANY BY NAME ==========

const deleteManyByName = async () => {
  try {
    const result = await Person.deleteMany({ name: 'Mary' });
    console.log('Deleted Marys:', result);
  } catch (err) {
    console.error(err);
  }
};

// ========== CHAIN QUERY HELPERS ==========

const searchChain = async () => {
  try {
    const result = await Person.find({ favoriteFoods: 'burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age');

    console.log('Search chain result:', result);
  } catch (err) {
    console.error(err);
  }
};

// ========== TEST FUNCTIONS ==========

// Uncomment the functions below to test specific functionality
// await createAndSavePerson();
//createManyPeople([{ name: "John", age: 30, favoriteFoods: ["Burger"] },{ name: "Mary", age: 22, favoriteFoods: ["Salad"] }]);
 //findPeopleByName("John");
// findOneByFood("Pizza");
// findPersonById("682366ad0cee851fbbbc3b54");
// addFoodAndSave("682366ad0cee851fbbbc3b54");
// updateAgeByName("John");
// deletePersonById("682366ad0cee851fbbbc3b54");
// deleteManyByName();
// searchChain();
