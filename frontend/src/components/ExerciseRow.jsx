import '../App.css'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import {useState, useEffect} from 'react';
import { MdCancel, MdEdit } from 'react-icons/md';

function ExerciseRow({exercise, setExerciseToEdit, getExercisesList}){
    /*
    This function returns an ExerciseRow component. It uses data from an exercise to fill table cells.
    */

    const navigate = useNavigate()

    async function onEdit(exerciseToEdit){
        /*
        This async function sets the exercise to edit (to prefill data on edit page), and navigates to the edit page.
        */
        setExerciseToEdit(exerciseToEdit)
        navigate("/edit");
        return
    }

    async function deleteExercise(){
        /*
        This async function calls the DELETE method on the specified exercise, and refreshes exercise list.
        */
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'DELETE'
        })

        getExercisesList()

        return
    }


    return(
    <tr>
        <td>{exercise.name}</td>
        <td>{exercise.reps}</td>
        <td>{exercise.weight}</td>
        <td>{exercise.unit}</td>
        <td>{exercise.date}</td>
        <td><MdEdit className="widget" onClick={() => onEdit(exercise)} /></td>
        <td><MdCancel className="widget" onClick={deleteExercise} /></td>
    </tr>
    )
}

export default ExerciseRow;