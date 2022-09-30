const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')


// get all posts 
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})

    res.status(200).json(workouts)
}
// get single post 
const getWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}
// posted a new post
const createWorkout = async (req,res) => {
   
    const { title,load,reps} = req.body

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete post 
const  deleteWorkout = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})
    
    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

//  update post 
const updateWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{...req.body})

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}





module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}