import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import ComparePage from "./pages/Compare/ComparePage";
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";

// Import Home and Login components if not already imported above
// import Home from './pages/Home';
// import Login from './pages/Login';

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
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App