import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';
import Home from './containers/Home';
import Register from './containers/Register';
import AddAdmin from './containers/AddAdmin';
import CreateCourse from './containers/MangeCourse/CreateCourse';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/createcourse" element={<CreateCourse />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
