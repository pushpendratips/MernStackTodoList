const mongoose = require('mongoose');
// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } 
});
const User = mongoose.model("User", userSchema);
module.exports = { User};