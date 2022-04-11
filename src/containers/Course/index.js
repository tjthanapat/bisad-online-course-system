import React, { useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourse, getLessons } from '../../functions/course';
import { isEnrollmentExist } from '../../functions/enroll';

import Button from '@mui/material/Button';

import LoadingPage from '../../components/LoadingPage';
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
    return <LoadingPage />;
  } else if (!auth.user) {
    return <Navigate to="/login" replace />;
  } else if (!!error) {
    return (
      <div className="bg-orange-400 min-h-screen flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-semibold text-white mb-8">Courseiku</h1>
        <div
          className="bg-white px-5 py-8 rounded-xl shadow-xl"
          style={{ minWidth: '300px' }}
        >
          <h2 className="text-lg font-medium">มีบางอย่างผิดพลาด</h2>
          <p className="mb-5">{error.message}</p>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
              type="submit"
            >
              หน้าแรก
            </Button>
          </Link>
        </div>
        <p className="text-white mt-16">Courseiku © 2022</p>
      </div>
    );
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
          element={
            <Enroll
              course={course}
              enrolled={enrolled}
              setEnrolled={setEnrolled}
            />
          }
        />
        <Route path="createlesson" element={<CreateLesson course={course} />} />
        <Route path="lesson" element={<Outlet />}>
          <Route
            path=""
            element={<p>Please select lesson from course page.</p>}
          />
          <Route
            path=":lessonId/*"
            element={
              <Lesson course={course} lessons={lessons} enrolled={enrolled} />
            }
          />
        </Route>
      </Routes>
    );
  }
};

export default Course;
