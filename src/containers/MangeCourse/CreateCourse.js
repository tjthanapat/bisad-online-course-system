import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createCourse } from '../../functions/courseManagement';

const CreateCourse = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const courseDataDefault = {
    id: '',
    name: '',
    description: '',
    instructor: '',
    coverImageUrl: '',
  };
  const [courseData, setCourseData] = useState(courseDataDefault);

  const handleChangeCourseDataInput = (event) => {
    setCourseData({ ...courseData, [event.target.id]: event.target.value });
  };

  const handleSubmitCreateCourse = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await createCourse(courseData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.message);
    }
  };

  if (auth.loading || loading) {
    return <p>Loading...</p>;
  } else if (!!auth.user && auth.user.admin) {
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
