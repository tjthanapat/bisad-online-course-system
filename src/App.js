import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
// import AddAdmin from './containers/AddAdmin';
import CreateCourse from './containers/MangeCourse/CreateCourse';
import Course from './containers/Course';
import Enroll from './containers/Enroll';
import LoadingPage from './components/LoadingPage';

import { ThemeProvider } from '@mui/material/styles';
import { courseikuTheme } from './muiTheme';

const App = () => {
  return (
    <ThemeProvider theme={courseikuTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="loading" element={<LoadingPage />} />
            {/* <Route path="addadmin" element={<AddAdmin />} /> */}
            <Route path="createcourse" element={<CreateCourse />} />
            <Route path="enroll" element={<Enroll />} />
            <Route path="course" element={<Outlet />}>
              <Route
                path=""
                element={<p>Please select course from course list page.</p>}
              />
              <Route path=":courseId/*" element={<Course />} />
            </Route>
            <Route path="*" element={<p>404 Not Found!</p>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
