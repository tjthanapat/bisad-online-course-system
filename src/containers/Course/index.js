import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourse, getLessons } from '../../functions/course';
import { isEnrollmentExist } from '../../functions/enroll';
import Enroll from '../Enroll';
import Lesson from '../Lesson';
import CreateLesson from '../MangeCourse/CreateLesson';
import EditCourse from '../MangeCourse/EditCourse';
import CoursePage from './CoursePage';

const Course = () => {
  const auth = useAuth();
  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await getCourse(courseId);
        const lessonsData = await getLessons(courseId);
        const enrollmentId = `${auth.user.uid}_${courseId}`;
        const isEnrolled = await isEnrollmentExist(enrollmentId);
        setCourse(courseData);
        setLessons(lessonsData);
        setEnrolled(isEnrolled);
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
        <Route
          path=""
          element={
            <CoursePage course={course} lessons={lessons} enrolled={enrolled} />
          }
        />
        <Route
          path="edit"
          element={<EditCourse course={course} setCourse={setCourse} />}
        />
        <Route
          path="enroll"
          element={<Enroll course={course} enrolled={enrolled} setEnrolled={setEnrolled}/>}
        />
        <Route path="createlesson" element={<CreateLesson course={course} />} />
        <Route path="lesson" element={<Outlet />}>
          <Route
            path=""
            element={<p>Please select lesson from course page.</p>}
          />
          <Route
            path=":lessonId/*"
            element={<Lesson course={course} lessons={lessons} enrolled={enrolled}/>}
          />
        </Route>
      </Routes>
    );
  }
};

export default Course;
