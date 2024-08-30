const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
})

const Students = new mongoose.model('Student', studentSchema)

module.exports = Students
