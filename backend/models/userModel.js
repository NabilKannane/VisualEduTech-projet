const mongoose = require("mongoose");

// definition d'un schèma
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
