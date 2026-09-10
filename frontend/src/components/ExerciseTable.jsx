import '../App.css'
import {useState, useEffect} from 'react';
import React from 'react';
import ExerciseRow from './ExerciseRow';

function ExerciseTable({exercises, setExerciseToEdit, getExercisesList}){
    /*
    This function returns the ExerciseTable component. It uses each exercise received and uses ExerciseRow to generate a table row for each exercise.
    */
    return(
        <div className="table">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} setExerciseToEdit={setExerciseToEdit} getExercisesList={getExercisesList} key={i}/>)}
            </tbody>
        </table>
        </div>
    )
}

export default ExerciseTable;