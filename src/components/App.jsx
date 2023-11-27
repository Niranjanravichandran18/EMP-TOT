import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup';
import Dashboard from './Dashboard';
import CandidateUpdate from './CandidateUpdate';
import AdminCandidateUpdate from './AdminCandidateUpdate';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='Signup' element={<Signup/>}/>
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/CandidateUpdate' element={<CandidateUpdate />} />
        <Route path='/AdminCandidateUpdate' element={<AdminCandidateUpdate />} />
      </Routes>
    </>
  )
}

export default App
