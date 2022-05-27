import React from 'react'
import Navbar from './components/Navbar'
import { Home } from './components/Home'
import { About } from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoteState from './context/NoteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is a note on cloud"/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Singup/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
