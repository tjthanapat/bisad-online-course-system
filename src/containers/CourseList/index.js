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
  const auth = useAuth();
  const { id, name, instructor, description, coverImageUrl } = props.courseData;
  return (
    <div className="flex border rounded-lg m-3">
      <div>
        <img
          src={coverImageUrl}
          className="h-48 w-72 object-cover rounded-l-lg"
          alt=""
        />
      </div>
      <div className="p-5">
        <p>
          {name} (id: {id})
        </p>
        <p>Instructor: {instructor}</p>
        <p>Description: {description}</p>
        <Link to={`/course/${id}`}>
          <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
            View
          </button>
        </Link>
        {!!auth.user.admin && (
          <Link to={`/course/${id}/edit`}>
            <button className="rounded-full py-1 px-5 ml-3 bg-blue-500 hover:bg-blue-600 text-white">
              Edit
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseList;
