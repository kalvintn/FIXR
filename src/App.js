// CSS
import './App.css';

// React 
import React from 'react';
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
  return (
    
    // Page Routing
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<GuestView/>} />
          <Route path="/signup" element={<SignupView/>} />
          <Route path="/login" element={<LoginView />} />
          <Route path='/guest' element={<GuestView/>} />
          <Route path='/user' element={<UserView/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/report-post' element={<ReportPost/>} />
          <Route path='/admin-panel' element={<AdminPanel/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
