import '../App.css'
import Header from '../components/Header'
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation';

function CreateExercisePage() {
    /*
    This function returns the body of the Create Exercise page.
    */
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('')
    const [date, setDate] = useState('')

    const navigate = useNavigate()

    async function addExercise(){
        /*
        This async function creates a New Exercise from the HTML inputs of the page. It puts their contents into a stringified JSON object and calls the POST method.
        */
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch('/exercises',{
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json'}
        })

        //Alert user whether or not addition was successful, then return to homepage.
        if (response.status === 201){
            alert("Exercise successfully added!")
        } else{
            alert(`Exercise addition unsuccessful, status code = ${response.status}`)
        }
        
        navigate("/")

        return
    }

    
    return(
        <>
        <div>
            <h2>Create an exercise! <span>&#40;</span>You must fill in all fields.<span>&#41;</span></h2>
        </div>
        
        <div className="inputs">
        <input
            type="text"
            placeholder="Enter name of exercise"
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
        </div>
        <div></div>
        <button onClick={addExercise}>Submit</button>
        </>
    )
}

export default CreateExercisePage;