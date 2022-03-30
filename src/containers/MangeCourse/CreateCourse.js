import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createCourse } from '../../functions/courseManagement';

const CreateCourse = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const courseDataDefault = {
    id: '',
    name: '',
    description: '',
    instructor: '',
    coverImageUrl: '',
    price: 0,
  };
  const [courseData, setCourseData] = useState(courseDataDefault);

  const handleChangeCourseDataInput = (event) => {
    setCourseData({ ...courseData, [event.target.id]: event.target.value });
  };

  const handleSubmitCreateCourse = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const courseDataExcludeId = {
        name: courseData.name,
        description: courseData.description,
        instructor: courseData.instructor,
        coverImageUrl: courseData.coverImageUrl,
        price: courseData.price,
      };
      await createCourse(courseData.id, courseDataExcludeId);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.message);
    }
  };

  if (auth.loading || loading) {
    return <p>Loading...</p>;
  } else if (success) {
    return (
      <div>
        <p>Created new course successfully.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }
  if (!!auth.user && auth.user.admin) {
    return (
      <div className="bg-orange-400 min-h-screen px-5 py-10">
        <div className="max-w-screen-lg bg-white p-5 mx-auto rounded-lg">
          <h1 className="text-2xl font-medium">Create New Course</h1>
          <form onSubmit={handleSubmitCreateCourse}>
            <div>
              <label htmlFor="id">Course ID</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
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
                className="block p-2 rounded border w-full"
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
                className="block p-2 rounded border w-full"
                id="instructor"
                placeholder="Instructor Full Name"
                value={courseData.instructor}
                onChange={handleChangeCourseDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="block p-2 rounded border w-full"
                id="description"
                rows={4}
                value={courseData.description}
                onChange={handleChangeCourseDataInput}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                min={0}
                step={0.01}
                className="block p-2 rounded border w-full"
                id="price"
                placeholder="Price"
                value={courseData.price}
                onChange={handleChangeCourseDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="coverImageUrl">Cover Image URL</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="coverImageUrl"
                placeholder="Cover Image URL"
                value={courseData.coverImageUrl}
                onChange={handleChangeCourseDataInput}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-10 rounded p-2 bg-orange-500 text-white uppercase"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <p>Only admin can access this page.</p>;
  }
};

export default CreateCourse;
