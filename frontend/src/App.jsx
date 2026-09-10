import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateExercisePage from './pages/CreateExercisePage'
import HomePage from './pages/HomePage'
import EditExercisePage from './pages/EditExercisePage';

function App() {
  //Initialize exerciseToEdit variable. setExerciseToEdit is raised from ExerciseRow so it can be used on edit page.
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="app">
      <Header />
      <Navigation />
      <div className="content-display">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
            <Route path="/create" element={ <CreateExercisePage />}></Route>
            <Route path="/edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App;
