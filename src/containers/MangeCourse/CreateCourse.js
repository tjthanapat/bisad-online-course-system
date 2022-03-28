import React, { useState } from 'react';

const CreateCourse = () => {
  const courseDataDefault = {
    id: '',
    name: '',
    description: '',
    instructor: '',
  };
  const [courseData, setCourseData] = useState(courseDataDefault);

  const handleChangeCourseDataInput = (event) => {
    setCourseData({ ...courseData, [event.target.id]: event.target.value });
  };

  const handleSubmitCreateCourse = (event) => {
    event.preventDefault();
    console.log(courseData);
  };

  return (
    <div>
      <h1>Create New Course</h1>
      <form onSubmit={handleSubmitCreateCourse}>
        <div>
          <label htmlFor="id">Course ID</label>
          <input
            type="text"
            className="block"
            id="id"
            placeholder="Course ID"
            value={courseData.id}
            onChange={handleChangeCourseDataInput}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            className="block"
            id="name"
            placeholder="Course Name"
            value={courseData.name}
            onChange={handleChangeCourseDataInput}
            required
          />
        </div>
        <div>
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            className="block"
            id="instructor"
            placeholder="Instructor Name"
            value={courseData.instructor}
            onChange={handleChangeCourseDataInput}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Course ID</label>
          <textarea
            className="block"
            id="description"
            rows={4}
            value={courseData.description}
            onChange={handleChangeCourseDataInput}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCourse;
