import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    // <div className="bg-[url('./assets/bgImage.svg')] bg-contain">

    <div className="relative min-h-screen">
      {/* Dark overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/bgImage.svg')] bg-cover bg-center bg-no-repeat z-[-1]" />

      {/* Your Page Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
