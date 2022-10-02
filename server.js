require('dotenv').config()
const port = process.env.PORT || 5005
const conn = process.env.MONGO_URI || 'mongodb://localhost/workouts'
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const cors = require('cors')


// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// connect to db
mongoose.connect(conn)
    .then(() => {
        app.listen(port, () => console.log(`Connected db && listening on port ${port}!`))
    })
    .catch((error) => {
        console.log(error)
    })

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


