import '../App.css'
import Header from '../components/Header'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

function EditExercisePage({exerciseToEdit}) {
    /*
    This function returns the body of the Edit Exercise page.
    */
    const id = exerciseToEdit._id
    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)

    const navigate = useNavigate()

    async function editExercise(){
        /*
        This async function edits an existing exercise from the input values of the HTML page. It puts their contents into a stringified JSON object, and calls the PUT method.
        */
        const updatedExercise = {name, reps, weight, unit, date}
        const response = await fetch(`/exercises/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExercise),
            headers: { 'Content-Type': 'application/json'}
        })

        //Alert user whether or not exercise was successfully edited, then return to homepage.
        if (response.status === 200){
            alert("Exercise successfuly edited!")
        }
        else{
            alert(`Edit exercise unsuccessful, status code ${response.status}`)
        }

        navigate("/")

        return

    }

    return(
        <>
        <div>
            <h2>Edit this exercise! <span>&#40;</span>You must fill in all fields.<span>&#41;</span></h2>
        </div>

        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
         />
         <input
            type="number"
            placeholder="Enter # of reps"
            value={reps}
            onChange={e => setReps(e.target.valueAsNumber)}
          />
          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={e => setWeight(e.target.valueAsNumber)}
           />
           <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="" disabled>Select unit</option>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
           </select>
            <input
            type="text"
            placeholder="Enter date"
            value={date}
            onChange={e => setDate(e.target.value)}
            />
        <div></div>
        <button onClick={editExercise}>Submit</button>
        
        </>

    )
}

export default EditExercisePage;