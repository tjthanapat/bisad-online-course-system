import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingPage from '../../components/LoadingPage';
import CourseList from '../CourseList';

const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Courseiku';
  });

  if (auth.loading) {
    return <LoadingPage />;
  } else if (!!auth.user) {
    return (
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <div className="mb-auto">
          <div className="max-w-screen-lg mx-auto my-5 px-5">
            <p className="md:text-right">
              เข้าใช้งานในชื่อ: {auth.user.firstName} {auth.user.lastName}
            </p>
          </div>
          <CourseList />
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Home;
