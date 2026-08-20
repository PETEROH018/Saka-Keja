import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import SearchResults from './pages/SearchResults/SearchResults'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin-dash' element={<AdminDashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/' element={<SearchResults/>}/>
      </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App