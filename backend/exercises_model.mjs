import mongoose from 'mongoose';
import 'dotenv/config';
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8'])

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

//Create Exercise class and schema
const EXERCISE_CLASS = 'Exercise';

const exerciseSchema = mongoose.Schema({
   name: {type: String, required: true},
   reps: {type: Number, required: true},
   weight: {type: Number, required: true},
   unit: {type: String, required: true},
   date: {type: String, required: true}
});

/**
 Create model for Exercise.
 */
const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);




function isDateValid(date) {
    //This function ensures date is in valid format (MM-DD-YY). Returns true or false.
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validateExercise(name, reps, weight, unit, date){
    /*
    This function takes exercise details and ensures each field falls within valid ranges.
    Returns true or false.
    */
    if(typeof name !== "string" || name.length === 0){
        return false
    } else if(typeof reps !== "number" || !Number.isInteger(reps) || reps < 1){
        return false
    } else if(typeof weight !== "number" || !Number.isInteger(weight) || weight < 1){
        return false
    } else if(unit !== "lbs" && unit !== "kgs"){
        return false
    } else if(typeof date !== "string" || !isDateValid(date)){
        return false        
    } else{
        return true
    }
}
const createExercise = async (name, reps, weight, unit, date) => {
    /*
    This async function takes exercise details, and creates Exercise object. Saves to DB.
    */
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

async function findExercise(filter){
    /*
    This async function takes filter parameters, and applies them to exercises in DB.
    Returns exercises under filtered conditions.
    */
    let query = Exercise.find(filter)
    return query.exec()
}

async function findExerciseById(filter){
    /*
    This async function takes one filter parameter: id.
    Returns exercise that matches id.
    */
    let query = Exercise.find(filter)
    return query.exec()
}

function readExerciseId(url){
    /*
    This function reads the exercise id from the url.
    Returns id number.
    */
    let exerciseId = String(url).substr(11)
    return exerciseId
}

async function replaceExercise(id, name, reps, weight, unit, date){
    /*
    This async function takes an exercise id, and updates the details in the DB.
    */
    let result = await Exercise.replaceOne({_id: id},
    { name: name, reps: reps, weight: weight, unit: unit, date: date}
    )
    return


}

async function deleteExercises(filter){
    /*
    This function deletes exercises based on the filter passed.
    */
    let result = await Exercise.deleteMany(filter)
    return result
}

async function deleteExerciseById(filter){
    /*
    This function deletes an exercise based on one filter parameter: id.
    */
    let result = await Exercise.deleteOne(filter)
    return
}
export { connect, validateExercise, createExercise, findExercise, findExerciseById, readExerciseId, replaceExercise, deleteExercises, deleteExerciseById };