const mongoose = require('mongoose');

//tells Mongoose which database we want to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection