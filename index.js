const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Require Router Handlers
const electronicJournal = require('./routes/api/electronicJournals')
const comment = require('./routes/api/comment')
const admin = require('./routes/api/admin')
const company = require('./routes/api/company')
const lawyer = require('./routes/api/lawyer')
const reviewer = require('./routes/api/reviewer')
const notification = require('./routes/api/notification')
const investor = require('./routes/api/investor')

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
})

// Direct to Route Handlers
app.use('/api/electronicJournals', electronicJournal)
app.use('/api/comment', comment)
app.use('/api/investor', investor)
app.use('/api/admin', admin)
app.use('/api/company', company)
app.use('/api/lawyer', lawyer)
app.use('/api/reviewers', reviewer)
app.use('/api/notification', notification)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT || 3001

app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
