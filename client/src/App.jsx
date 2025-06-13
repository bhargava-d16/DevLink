import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import {Toaster}  from 'react-hot-toast';
const App = () => {
  return (
    <div className="relative min-h-screen">
      
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="absolute inset-0 bg-[url('./assets/bgImage.svg')] bg-cover bg-center bg-no-repeat z-[-1]" />

      <div className="relative z-10">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
