import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CourseList = () => {
  const auth = useAuth();
  if (!!auth.user.admin) {
    return (
      <div>
        <p>Admin UI</p>
        <Link to="/createcourse">Create New Course</Link>
      </div>
    );
  } else {
    return (
      <div>
        <p>Student UI</p>
      </div>
    );
  }
};

export default CourseList;
