const Workout = require('../models/workoutSchema');
const mongoose = require('mongoose')

//get all workout
const getAllWorkouts = async(req,res)=>{
    try{
       const workoutData = await Workout.find().sort({createdAt:-1});
       res.status(200).json(workoutData)
      
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//get a single workout
 const getWorkout = async(req,res)=>{
    try{
        const {id} =req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such workout"})
        }
        const workoutData = await Workout.findById(id)

        if(!workoutData){
            return res.status(404).json({error:"no such workout"})
        }

        res.status(200).json(workoutData)
    }catch(error){
        res.status(400).json({error:error.message})
    }
 }

//create a new workout
const createWorkout = async(req,res)=>{
    const {title,load,reps} = req.body;
    //adding into database
    let emptyFields =[]

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(404).json({error:'please fill all the fields',emptyFields})
    }
    //add docs to database
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workoutData= await Workout.findOneAndDelete({_id:id})
    
    if(!workoutData){
        return res.status(400).json({error:"no such workout"})
    }
    res.status(200).json(workoutData)
}

//update a workout
const updateWorkout = async(req,res)=>{
    const   id=req.params.id;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout =await Workout.findOneAndUpdate({_id:id},{
        ...req.body  
    })
    if(!workout){
        return res.status(400).json({error:"no such workout"})
    }
    res.status(200).json(workout)
}


module.exports ={createWorkout,getAllWorkouts,getWorkout,deleteWorkout,updateWorkout}