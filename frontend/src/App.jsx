import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WhySakaKeja from "./components/WhySakaKeja";

function App() {

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
    
  <div className="bg-surface text-on-surface font-sans min-h-screen">
      <WhySakaKeja />
    </div>

    </>
  )
}

export default App
