import logo from './logo.svg';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import UserCheck from './components/UserCheck';
import AddUser from './components/AddUser';
import AddDrawing from './components/AddDrawing';
import EditUser from './components/EditUser';
import GetGlobalDrawings from './components/GetGlobalDrawings';
import AddTag from './components/AddTag';
import NavBar from './components/Navbar';
import AddTagDrawing from './components/AddTagDrawing';
import AddTagDrawingTest from './components/addtagdrawingtest';
import AddTagsDrawings from './components/AddTagsDrawings';
import ViewDrawing from './components/ViewDrawing';
import UserPage from './components/UserPage';
import OtherUsersPage from './components/OtherUsersPage'
import SearchPage from './components/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
 
      {/* <Router>
        <NavBar /> 
        <Routes>
          <Route path='/' element={<GetGlobalDrawings />} /> 
          <Route path='/SearchPage/:searchParams' element={<SearchPage />} /> 
          <Route path='/ViewDrawing/:id' element={<ViewDrawing />} />
          <Route path='/UserPage' element={<UserPage />} />
          <Route path='/OtherUsersPage/' element={<OtherUsersPage />} />
          <Route path='/EditUser' element={<EditUser />} />
          <Route path='/AddTag' element={<AddTag />} />
          <Route path='/AddDrawing' element={<AddDrawing />} />
          <Route path='/AddTagDrawing' element={<AddTagDrawing />} />
          <Route path='/AddTagDrawingtest' element={<AddTagDrawingTest />} />
          <Route path='/AddTagsDrawings' element={<AddTagsDrawings />} />
        </Routes>
      </Router> */}

  );
}

export default App;
