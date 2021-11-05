const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  servers: {
    type: Array,
    default: []
  },
  bio: {
    type: String,
    default: ''
  },
  reviews: {
    type: Array,
    default: []
  }
})
module.exports = mongoose.model('profile', profileSchema)
