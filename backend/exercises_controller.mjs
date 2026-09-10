import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8'])

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

//Connect to DB
app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

//Initialize error messages.
const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQ = {Error: "Invalid request"}


app.post('/exercises', asyncHandler(async (req, res) => {
    //Validate exercise with values from request.
    if(exercises.validateExercise(req.body.name,
                                  req.body.reps,
                                  req.body.weight,
                                  req.body.unit,
                                  req.body.date)){
    
    //If exercise is valid, create exericse. Set status response to 201.
    const user = await exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date);
    res.status(201).json(user);
                                  }
    else{
    //Otherwise set status response to 400, Invalid Request.
        res.status(400).json(ERROR_INVALID_REQ);
    }
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    //Initialize filter
    let filter = {}

    //Apply different conditions to filter based on request.
    if(typeof req.query.name !== "undefined"){
        filter.name = req.query.name
    }
    if(typeof req.query.reps !== "undefined"){
        filter.reps = req.query.reps
    }
    if(typeof req.query.weight !=="undefined"){
        filter.weight = req.query.weight
    }
    if(typeof req.query.unit !== "undefined"){
        filter.unit = req.query.unit
    }
    if(typeof req.query.date !== "undefined"){
        filter.date = req.query.date
    }

    //Retreive exercises based on filter. Set status resposne to 200.
    let result = await exercises.findExercise(filter)
    res.status(200).json(result)
}));

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    //Read exercise ID
    let exerciseId = exercises.readExerciseId(req.url)
    let filter = {_id: exerciseId}
    let result = await exercises.findExerciseById(filter)
    
    //If no exercise found, set status response to 404, not found.
    //Otherwise, set to 200.
    if (result.length === 0){
        res.status(404).json(ERROR_NOT_FOUND)
    }
    else {
        res.status(200).json(result)
    }
    
}));

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    
    //Read exercise ID, and find specified exercise.
    let exerciseId = exercises.readExerciseId(req.url)
    let filter = {_id: exerciseId}
    let exercise = await exercises.findExerciseById(filter)

    //If exercise request is invalid, set status response to 400, invalid request.
    //If exercise not found, set status response to 404, not found.
    //Otherwise replace exercise, and set status response to 200.
    if(!exercises.validateExercise(req.body.name,
                                  req.body.reps,
                                  req.body.weight,
                                  req.body.unit,
                                  req.body.date)){
        res.status(400).json(ERROR_INVALID_REQ)
    } else if (exercise.length === 0){
        res.status(404).json(ERROR_NOT_FOUND)
    }
    else{
    await exercises.replaceExercise(exerciseId, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    
    let result = await exercises.findExerciseById(filter)
    res.status(200).json(result)
    }
    }
    
));

app.delete('/exercises', asyncHandler(async (req, res) => {
    //Initialize filter.
    let filter = {}

    //Set filter values from request.
    if(typeof req.query.name !== "undefined"){
        filter.name = req.query.name
    }
    if(typeof req.query.reps !== "undefined"){
        filter.reps = req.query.reps
    }
    if(typeof req.query.weight !=="undefined"){
        filter.weight = req.query.weight
    }
    if(typeof req.query.unit !== "undefined"){
        filter.unit = req.query.unit
    }
    if(typeof req.query.date !== "undefined"){
        filter.date = req.query.date
    }

    //Delete exercises by filter and set status response to 200, returning # of deleted exercises.
    let deleteCount = await exercises.deleteExercises(filter)

    res.status(200).json(deleteCount)
    
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    //Read exercise id from url, and find exercise.
    let exerciseId = exercises.readExerciseId(req.url)
    let filter = {_id: exerciseId}
    let exercise = await exercises.findExerciseById(filter)
    await exercises.deleteExerciseById(filter)

    //If no exercise found/deleted set status response to 404, not found.
    //Otherwise, set to 204, success.
    if (exercise.length === 0){
        res.status(404).json(ERROR_NOT_FOUND)
    }
    else {
        res.status(204).json()
    }
    
}));


