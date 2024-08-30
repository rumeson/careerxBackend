const express = require('express')
const app = express()

// DOTENV
const dotenv = require('dotenv').config()

// IMPORT MONGOOSE
const connectDB = require('./db/db.js')
const Students = require('./models/studentModel.js')
const Users = require('./models/userModel.js')
connectDB()

// MIDDLEWARE
app.use(express.json())

// CREATE PORT
const PORT = process.env.PORT || 8000

// PORT LISTEN
app.listen(PORT, () => {
  console.log(`Server is listening on Port : ${PORT}`)
})

// CRUD AUTHENTICATION

// HOME API
app.get('/', (req, res) => {
  res.json('Welcome to Access bank server')
})

// /STUDENTS API
app.post('/students', (req, res) => {
  const { email, password } = req.body

  res.json(email)
})

// /EZE API
app.put('/eze', (req, res) => {
  const { name, state, age } = req.body
  res.json({ message: 'Successful', name, state, age })
})

// /RRRRR
app.post('/rrrrr', (req, res) => {
  const { email, name, state, age, phoneNumber } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Please add your email' })
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'Please you are underage' })
  }
  if (!name) {
    return res.json({ message: 'Please add your name' })
  }
  const newUser = { email, name, state, age, phoneNumber }
  return res.json({ message: 'Registration Successful', newUser })
})

// /EDIT USER API
app.put('/edit_user', (req, res) => {
  const { name, email, phoneNumber } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Please add your email' })
  }

  const userID = Math.floor(Math.random() * 100)
  const date = new Date()

  const newUser = {
    name,
    email,
    phoneNumber,
    userID,
    date_Of_Registration: date,
  }

  return res
    .status(200)
    .json({ message: 'Registration successful', user: newUser })
})

// REAL C R U D    OPERATIONS

// CREATE NEW USER API
app.post('/register', async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Please add your email' })
  }

  const alreadyExisting = await Students.findOne({ email })

  if (alreadyExisting) {
    return res.status(400).json({ message: 'This user already exists' })
  }

  const newUser = new Students({ firstName, lastName, age, email, password })

  await newUser.save()
  return res
    .status(200)
    .json({ message: 'User Registration Successful', newUser })
})

// READ DATABASE
app.get('/students', async (req, res) => {
  const allStudents = await Students.find()

  return res.status(200).json({
    message: 'Successful',
    count: allStudents.length,
    allStudents,
  })
})

app.post('/add_user', async (req, res) => {
  const { name, email, age } = req.body

  if (!name || name.length < 3) {
    return res.status(400).json({ message: 'Please add your name' })
  }

  const alreadyExisting = await Students.findOne({ email })

  if (alreadyExisting) {
    return res.status(400).json({ message: 'This user already exists' })
  }
  const newUser = new Users({ name, email, age })
  await newUser.save()
  return res
    .status(200)
    .json({ message: 'User Registration Successful', newUser })
})

app.patch('/updateEmail', async (req, res) => {})

// DEFAULT API
app.use((req, res) => {
  res.status(404).json('This page does not exist')
})
