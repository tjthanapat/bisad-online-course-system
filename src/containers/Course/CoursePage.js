import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CoursePage = (props) => {
  const auth = useAuth();
  const { id, name, instructor, description, price, coverImageUrl } =
    props.course;

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
        </div>
      </div>
      <div>
        {!!auth.user.admin && (
          <Link to={`/course/${id}/createlesson`}>
            <button className="rounded-full py-1 px-5 bg-blue-500 hover:bg-blue-600 text-white">
              Create New Lesson
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default CoursePage;
