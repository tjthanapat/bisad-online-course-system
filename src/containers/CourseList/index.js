import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCourses } from '../../functions/course';

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

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div>
        <p>{!!auth.user.admin ? 'Admin UI' : 'Student UI'}</p>
        {!!auth.user.admin && <Link to="/createcourse">Create New Course</Link>}
        {!!courses &&
          courses.map((course) => (
            <CourseCard key={course.id} courseData={course} />
          ))}
      </div>
    );
  }
};

const CourseCard = (props) => {
  const { id, name, instructor, description, coverImageUrl } = props.courseData;
  return (
    <div className="flex">
      <div >
        <img src={coverImageUrl} className="h-48 w-48 object-cover" alt="" />
      </div>
      <div>
        <p>
          {name} (id: {id})
        </p>
        <p>Instructor: {instructor}</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};

export default CourseList;
