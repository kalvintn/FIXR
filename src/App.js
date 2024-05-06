// CSS
import './App.css';

// React 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Needed Components
import GuestView from "./pages/GuestView/GuestView";
import LoginView from "./pages/LoginView/Login";
import SignupView from "./pages/SignupView/Signup";
import UserView from "./pages/UserView/UserView";
import CreatePost from './pages/CreatePostView/CreatePost';
import ReportPost from './pages/ReportPostView/ReportPost';
import AdminPanel from './pages/AdminPanelView/AdminPanel';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  const updateUserRole = (role) => {
    setUserRole(role);
  };

  const updateUsername = (username) => {
    setUsername(username);
  };


  return (
    // Page Routing
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<GuestView/>} />
          <Route path="/signup" element={<SignupView role={updateUserRole} my_username={updateUsername} />} />
          <Route path="/login" element={<LoginView role={updateUserRole} my_username={updateUsername} />} />
          <Route path='/guest' element={<GuestView/>} />
          <Route path='/user' element={<UserView role={userRole} my_username={username} />} />
          <Route path='/create-post' element={<CreatePost role={userRole} my_username={username}  /> } />
          <Route path='/report-post' element={<ReportPost role={userRole} my_username={username} />} />
          <Route path='/admin-panel' element={<AdminPanel role={userRole} my_username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
