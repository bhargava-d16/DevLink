import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import { Toaster , toast} from 'react-hot-toast';
import { useAuth } from './store/useAuth';
import { Loader } from 'lucide-react';
import CodeEditor from './pages/CodeEditor';
import LandingPage from './pages/Home';
import QuickChatDashboard from './pages/DashBoard';


const App = () => {
     const [font,setfont]=useState("medium");
  return (
    <div className="relative min-h-screen">
      
     
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/dashboard" element={<QuickChatDashboard/>} />
          <Route path="/settings" element={<ProfilePage/>}/>
          <Route path="/codeeditor" element={<CodeEditor/>}/>
        </Routes>
      {/* </div> */}
    </div> 
  );
};

export default App;
