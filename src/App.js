import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';
import Register from './containers/Register';
import Home from './containers/Home';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
