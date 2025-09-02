const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Student = require('./models/student');
const Attendance = require('./models/attendance');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const studentsData = [
  { rollNo: 1, name: 'Aaradhana Patidar' },
  { rollNo: 2, name: 'Aayushi Gehlod' },
  { rollNo: 3, name: 'Abhay Mishra' },
  { rollNo: 4, name: 'Abhishek Parmar' },
  { rollNo: 5, name: 'Ajabrao' },
  { rollNo: 6, name: 'Akshat Jain' },
  { rollNo: 7, name: 'Aman Kori' },
  { rollNo: 8, name: 'Ankit Verma' },
  { rollNo: 9, name: 'Ankit Kumar' },
  { rollNo: 10, name: 'Anurag Khede' },
  { rollNo: 11, name: 'Anurag Pandey' },
  { rollNo: 12, name: 'Anushka Kanungo' },
  { rollNo: 13, name: 'Bulbul Verma' },
  { rollNo: 14, name: 'Chanchal Vishwakarma' },
  { rollNo: 15, name: 'Chanchal Yadav' },
  { rollNo: 16, name: 'Chetna Solanki' },
  { rollNo: 17, name: 'Daksha Kushwah' },
  { rollNo: 18, name: 'Damanpreet Kaur Bhatia' },
  { rollNo: 19, name: 'Deepak' },
  { rollNo: 20, name: 'Deepika Mishra' },
  { rollNo: 21, name: 'Devendra Barman' },
  { rollNo: 22, name: 'Dileep Mandari' },
  { rollNo: 23, name: 'Dipesh Yadav' },
  { rollNo: 24, name: 'Divya Ganeshchar' },
  { rollNo: 25, name: 'Divyanshi Yadav' },
  { rollNo: 26, name: 'Gaurav Malviya' },
  { rollNo: 27, name: 'Hariom Dhakad' },
  { rollNo: 28, name: 'Harshika Mali' },
  { rollNo: 29, name: 'Hridyansh Chaudhary' },
  { rollNo: 30, name: 'Kanishk Dubey' },
  { rollNo: 31, name: 'Khokhawala Aliasgar Moiz' },
  { rollNo: 32, name: 'Khushi Bhawsar' },
  { rollNo: 33, name: 'Khushi Dubey' },
  { rollNo: 34, name: 'Kratika Dangi' },
  { rollNo: 35, name: 'Krishna Rajpal' },
  { rollNo: 36, name: 'Lokesh Garhwal' },
  { rollNo: 37, name: 'Mo Maaz Khan' },
  { rollNo: 38, name: 'Mohit Chouhan' },
  { rollNo: 39, name: 'Mukesh' },
  { rollNo: 40, name: 'Muskan Sahu' },
  { rollNo: 41, name: 'Naziya Khan' },
  { rollNo: 42, name: 'Neha Yadav' },
  { rollNo: 43, name: 'Nitin Deshmukh' },
  { rollNo: 44, name: 'Omprakash Singh Chouhan' },
  { rollNo: 45, name: 'Palak Yadav' },
  { rollNo: 46, name: 'Pallavi Soni' },
  { rollNo: 47, name: 'Pradeep Kanel' },
  { rollNo: 48, name: 'Pragya Borse' },
  { rollNo: 49, name: 'Priya Katiyar' },
  { rollNo: 50, name: 'Priyanka Shukla' },
  { rollNo: 51, name: 'Priyanshu Patnare' },
  { rollNo: 52, name: 'Rahul Choudhary' },
  { rollNo: 53, name: 'Rajeshwari' },
  { rollNo: 54, name: 'Ram Namdev' },
  { rollNo: 55, name: 'Reetik Sonp' },
  { rollNo: 56, name: 'Riddhi Jadon' },
  { rollNo: 57, name: 'Rohit Mansore' },
  { rollNo: 58, name: 'Rohit Tiwari' },
  { rollNo: 59, name: 'Sakshi Patel' },
  { rollNo: 60, name: 'Sanjana Shinde' },
  { rollNo: 61, name: 'Sarvesh Ojha' },
  { rollNo: 62, name: 'Shivam Dawar' },
  { rollNo: 63, name: 'Shivani Puri' },
  { rollNo: 64, name: 'Shivendra Chaurasiya' },
  { rollNo: 65, name: 'Shraddha Tiwari' },
  { rollNo: 66, name: 'Shreya Gupta' },
  { rollNo: 67, name: 'Shubham Nagda' },
  { rollNo: 68, name: 'Shubham Patidar' },
  { rollNo: 69, name: 'Shubham Yadav' },
  { rollNo: 70, name: 'Suhani Yadav' },
  { rollNo: 71, name: 'Swasti Jain' },
  { rollNo: 72, name: 'Swayam Gupta' },
  { rollNo: 73, name: 'Ujjwal Patel' },
  { rollNo: 74, name: 'Uma Patidar' },
  { rollNo: 75, name: 'Vaishnavi Sharma' },
  { rollNo: 76, name: 'Vanshika Agrawal' },
  { rollNo: 77, name: 'Vishal Chouhan' },
  { rollNo: 78, name: 'Yashvardhan Singh Goud' },
  { rollNo: 79, name: 'Leo Sunny Thomas' },
  { rollNo: 80, name: 'Mehak Kochar' },
  { rollNo: 81, name: 'Tahera' },
];

// Seed students (run once via /api/seed)
app.get('/api/seed', async (req, res) => {
  const count = await Student.countDocuments();
  if (count === 0) {
    await Student.insertMany(studentsData);
    res.send('Students seeded');
  } else {
    res.send('Students already seeded');
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  const students = await Student.find().sort('rollNo');
  res.json(students);
});

// Post new attendance
app.post('/api/attendance', async (req, res) => {
  const { date, subject, attendances } = req.body;
  const newAttendance = new Attendance({ date, subject, attendances });
  await newAttendance.save();
  res.json(newAttendance);
});

// Get attendance by date (optional subject)
app.get('/api/attendance', async (req, res) => {
  const { date, subject } = req.query;
  const query = { date };
  if (subject) query.subject = subject;
  const attendances = await Attendance.find(query).populate('attendances.student');
  res.json(attendances);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));