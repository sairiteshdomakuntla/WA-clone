const mongoose = require('mongoose');

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      // console.log(`Database connected with ${data.connection.host}`)
    console.log("Database connected")
    )
    .catch((err) => {
      console.log(`Error connecting DB: ${err.message}`);
    });
};

module.exports = connectToDb;
