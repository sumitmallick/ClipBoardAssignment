const mongoose = require('mongoose');

// Set the default promise library to use
mongoose.Promise = global.Promise;

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Failed to connect to the database', err));

module.exports = mongoose;
