import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage";
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/admin-dash' element={<AdminDashboard/>}/>
        <Route path='/apartment-details' element={<ApartmentDetails/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/StudentProfile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App