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
    return (
      <div className="max-w-screen-lg mx-auto px-5">
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div className="max-w-screen-lg mx-auto px-5">
        {!!auth.user.admin && (
          <div className="flex justify-end">
            <Link to="/createcourse">
              <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
                สร้างคอร์สเรียนใหม่
              </button>
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

const CourseCard = (props) => {
  const auth = useAuth();
  const { course } = props;
  return (
    <div className="flex flex-col md:flex-row border rounded-lg my-5">
      <div className="h-48 md:w-72">
        <img
          src={course.coverImageUrl}
          className="h-full w-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          alt={course.name}
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium text-xl">{course.name}</h3>
        <p className="truncate">{course.description}</p>
        <div className="mt-5">
          <Link to={`/course/${course.id}`}>
            <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
              ดูรายละเอียด
            </button>
          </Link>
          {!!auth.user.admin && (
            <Link to={`/course/${course.id}/edit`}>
              <button className="rounded-full py-1 px-5 ml-3 bg-blue-500 hover:bg-blue-600 text-white">
                แก้ไข
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
