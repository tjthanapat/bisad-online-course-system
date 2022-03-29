import React from 'react';

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
      </div>
    </div>
  );
};

export default CoursePage;
