const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: String, // YYYY-MM-DD
  subject: String,
  timestamp: { type: Date, default: Date.now },
  attendances: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    present: Boolean
  }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);