import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourse } from '../../functions/course';
import EditCourse from '../MangeCourse/EditCourse';
import CoursePage from './CoursePage';

const Course = () => {
  const auth = useAuth();
  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [course, setCourse] = useState({});

  useEffect(() => {
    const getCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (!!auth.user) {
      getCourseData();
    } else {
      setLoading(false);
    }
  }, [auth.user, courseId]);

  if (auth.loading || loading) {
    return <p>Loading...</p>;
  } else if (!auth.user) {
    return <p>Please sign in to access this page.</p>;
  } else if (!!error) {
    return <p>{error.message}</p>;
  } else {
    return (
      <Routes>
        <Route path='' element={<CoursePage course={course} />} />
        <Route path='edit' element={<EditCourse course={course}/>} />
      </Routes>
    );
  }
};



export default Course;
