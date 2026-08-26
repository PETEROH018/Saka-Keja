import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home.jsx';
import AdminDashboard from './pages/AdminDashboard/Admindashboard.jsx';
import ApartmentDetails from './pages/ApartmentDetails.jsx';
import SearchResults from './pages/SearchResults/SearchResults.jsx';
import Auth from './pages/Login/Auth.jsx';
import ComparePage from './pages/Compare/ComparePage.jsx';

// Components used as routes
import StudentProfile from './components/StudentProfile/StudentProfile.jsx';
import EditProfile from './components/EditProfile/EditProfile.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/home' element={<Home />} />
      <Route path='/admin-dash' element={<AdminDashboard />} />
      <Route path='/apartment-details' element={<ApartmentDetails />} />
      <Route path='/search' element={<SearchResults />} />
      <Route path='/compare' element={<ComparePage />} />
      <Route path='/StudentProfile' element={<StudentProfile />} />
      <Route path='/EditProfile' element={<EditProfile />} />
    </Routes>
  );
}

export default App;