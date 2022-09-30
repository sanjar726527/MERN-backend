const express = require('express')

const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout 
      } = require('../controllers/WorkoutController')
      
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// Get all workouts
router.get('/', getWorkouts)

// Get single workout
router.get('/:id', getWorkout)

// Post a new workout
router.post('/', createWorkout)

// Delete workout
router.delete('/:id',deleteWorkout)

// Update workout
router.put('/:id', updateWorkout)

module.exports = router