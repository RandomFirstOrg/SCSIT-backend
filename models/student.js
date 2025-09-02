const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: Number,
  name: String
});

module.exports = mongoose.model('Student', studentSchema);