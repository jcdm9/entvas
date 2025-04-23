const mongoose = require("mongoose");

const InitiateMongoServer = async () => {
  try {
    const url = process.env.DB_URL;
    await mongoose.connect(url);

    console.log(`Database connected to ${process.env.DB_URL}.`);
  } catch (e) {
    console.log(`Database Error: ${e}`);
    throw e;
  }
};

module.exports = { InitiateMongoServer };
