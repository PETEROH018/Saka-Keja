import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/admin-dash' element={<AdminDashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Login/>}/>
      
    </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App
