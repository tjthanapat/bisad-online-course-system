import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourses } from '../../functions/course';

import Button from '@mui/material/Button';

import CourseCard from './CourseCard';

const CourseList = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCoursesData = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCoursesData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <div className="lds-ellipsis">
          <div className="orange"></div>
          <div className="orange"></div>
          <div className="orange"></div>
          <div className="orange"></div>
        </div>
        <p>กำลังโหลด</p>
      </div>
    );
  } else {
    return (
      <div className="max-w-screen-lg mx-auto px-5">
        {!!auth.user.admin && (
          <div className="flex justify-end">
            <Link to="/createcourse">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
              >
                สร้างคอร์สเรียนใหม่
              </Button>
            </Link>
          </div>
        )}
        <div className="my-5">
          {!!courses &&
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    );
  }
};

export default CourseList;
