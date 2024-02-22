module.exports = uri = "mongodb+srv://myAtlasDBUser:Mamba824.@myatlasclusteredu.qirhlwa.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require('mongoose');
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`Connected to the ${mongoose.connection.db.databaseName} database`);
  } catch (err) {
    console.error(`Error connecting to db: ${err}`);
  }
};

const main = async () => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error(`Error connecting to db: ${err}`);
  } finally {
    await mongoose.connection.close();
  }
};

main();

module.exports = main;