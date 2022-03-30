import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CoursePage = (props) => {
  const auth = useAuth();
  const { id, name, instructor, description, price, coverImageUrl } =
    props.course;
  const { lessons } = props;
  return (
    <>
      <div className="flex">
        <div>
          <img src={coverImageUrl} className="h-48 w-48 object-cover" alt="" />
        </div>
        <div>
          <p>
            {name} (id: {id})
          </p>
          <p>Instructor: {instructor}</p>
          <p>Description: {description}</p>
          <p>Price: {price} baht</p>
          {!!auth.user.admin ? (
            <Link to={`/course/${id}/edit`}>
              <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
                Edit
              </button>
            </Link>
          ) : (
            <Link to={`/enroll`}>
              <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
                Enroll
              </button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium">Lessons</h2>
        {!!auth.user.admin && (
          <Link to={`/course/${id}/createlesson`}>
            <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
              Create New Lesson
            </button>
          </Link>
        )}

        {!!lessons &&
          lessons.map((lesson) => (
            <div key={lesson.id}>
              <p>
                Lesson: {lesson.name} (id: {lesson.id})
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
export default CoursePage;
