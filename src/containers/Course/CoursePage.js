import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CoursePage = (props) => {
  const auth = useAuth();
  const { lessons, course, enrolled } = props;

  return (
    <>
      <div className="flex">
        <div>
          <img
            src={course.coverImageUrl}
            className="h-48 w-48 object-cover"
            alt=""
          />
        </div>
        <div>
          <p>
            {course.name} (id: {course.id})
          </p>
          <p>Instructor: {course.instructor}</p>
          <p>Description: {course.description}</p>
          <p>Price: {course.price} baht</p>
          {!!auth.user.admin && (
            <Link to={`/course/${course.id}/edit`}>
              <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
                Edit
              </button>
            </Link>
          )}
          {!auth.user.admin && !enrolled && (
            <Link to={`/course/${course.id}/enroll`}>
              <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
                Enroll
              </button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium">Lessons</h2>
        {!!auth.user.admin && (
          <Link to={`/course/${course.id}/createlesson`}>
            <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
              Create New Lesson
            </button>
          </Link>
        )}

        {!!lessons &&
          lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              courseId={course.id}
              lesson={lesson}
              enrolled={enrolled}
            />
          ))}
      </div>
    </>
  );
};

const LessonItem = (props) => {
  const auth = useAuth();
  const { courseId, lesson, enrolled } = props;
  return (
    <div>
      <p>
        {lesson.name} (id: {lesson.id})
      </p>
      {auth.user.admin || enrolled ? (
        <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
          <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
            View
          </button>
        </Link>
      ) : (
        <button className="rounded-full py-1 px-5 bg-gray-300 cursor-not-allowed">
          View
        </button>
      )}

      {auth.user.admin && (
        <Link to={`/course/${courseId}/lesson/${lesson.id}/edit`}>
          <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
            Edit
          </button>
        </Link>
      )}
    </div>
  );
};

export default CoursePage;
