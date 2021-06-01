require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const personSchema = require('./schemas/PersonSchema.js');

const tmp = 'mongodb+srv://user:9GPz6qNqKXyLAtfT@cluster0.dssak.mongodb.net/freecodecamp?retryWrites=true&w=majority'
// Check for connection error



mongoose.connect(process.env.MONGO_URL || tmp,{useNewUrlParser: true, useUnifiedTopology: true});
db.on('error',console.error.bind(console,'connection error'));
let Person = mongoose.model('Person',personSchema);


function handleErrors(err,res,done){
  if(err) {
    done(err);
  } else {
    done(null,res);
  }
}

const createAndSavePerson = (done) => {
  const testPerson = new Person({
    name: "Bob",
    age: 34,
    favoriteFoods: ['ice cream','seafood','burger']
  });
  testPerson.save((err,data) => {
    if(err) {
      console.log(err);
      done(err);
    }
    else {
      console.log(data);
      done(null,data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) => {
    if(err) {
      console.log(err)
      done(err);
    }
    else {
      done(null,data)
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,res) => {
    if(err) {
      console.log(err);
      done(err);
    }
    else {
      done(null,res);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : {$all: [food]}}, (err,res) => {
    handleErrors(err,res,done);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,res) => {
    handleErrors(err,res,done);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId,(status,res) => {
    if(status) {
      done(status);
    } else {
      res.favoriteFoods.push(foodToAdd);
      console.log(res);
      res.save((err,data) => {
        handleErrors(err,data,done);
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new: true},(err,res) => {
    handleErrors(err,res,done);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,res) => {
    handleErrors(err,res,done);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,res) => {
    handleErrors(err,res,done);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
