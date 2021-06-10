const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('../../models/tourModels');

// const DB =
//   'mongodb+srv://dapo:Eu5llusADu13fvXZ@cluster0.p4vqx.mongodb.net/natours?retryWrites=true&w=majority';
const DB =
  'mongodb://localhost:27017/natours?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log('DB connection successful!'))
  .catch((error) => console.log(error));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Exported all data to database');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted data successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import' || process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '--delete' || process.argv[2] === '-d') {
  deleteData();
}
