import '../App.css'
import {useState, useEffect} from 'react';
import ExerciseTable from '../components/ExerciseTable';
import ExerciseRow from '../components/ExerciseRow';
import Navigation from '../components/Navigation';

function HomePage({setExerciseToEdit}) {
    /*
    This function returns the body of the homepage.
    */
    const [exercises, setExercises] = useState([])

    async function getExercisesList(){
        /*
        This async function calls the GET method to retrieve exercises from the database.
        */
        const response = await fetch('/exercises', {
            method: 'GET'
        })
        
        let exercises = await response.json()

        setExercises(exercises)

        return
    }

    //Load exercises list.
    useEffect(() => {
        getExercisesList()
    }, []);

    return(
        <>
        <h2>Your Exercises:</h2>
        <ExerciseTable exercises={exercises} setExerciseToEdit={setExerciseToEdit} getExercisesList={getExercisesList}></ExerciseTable>
        </>
    )
}

export default HomePage;