import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import MyProperties from './pages/MyProperties/MyProperties'
import EditProperty from "./pages/EditProperty/EditProperty";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage";
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx";
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx'
import About from "./pages/About/About.jsx";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/apartment-details" element={<ApartmentDetails />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />

        <Route path="/compare" element={<ComparePage />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/owner-profile" element={<OwnerProfile />} />

        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App