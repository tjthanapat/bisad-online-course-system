import React from 'react';
import { Link } from 'react-router-dom';

const CoursePage = (props) => {
  const { id, name, instructor, description, price, coverImageUrl } =
    props.course;

  return (
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
        <Link to={`/enroll`}>
          <button className="rounded-full py-1 px-5 bg-orange-500 hover:bg-orange-600 text-white">
            Enroll
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoursePage;
