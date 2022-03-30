import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateLesson } from '../../functions/courseManagement';

const EditLesson = (props) => {
  const auth = useAuth();
  const { course, lesson } = props;
  const [loading, setLoading] = useState(false);

  const [lessonData, setLessonData] = useState(lesson);

  const handleChangeLessonDataInput = (event) => {
    setLessonData({ ...lessonData, [event.target.id]: event.target.value });
  };
  const handleChangeLessonType = (event) => {
    setLessonData({ ...lessonData, type: event.target.value });
  };

  const handleSubmitCreateLesson = async (event) => {
    event.preventDefault();
    console.log(lessonData);
    try {
      setLoading(true);
      const lessonDataExcludeId = {
        name: lessonData.name,
        description: lessonData.description,
        type: lessonData.type,
        source: lessonData.source,
      };
      await updateLesson(course.id, lessonData.id, lessonDataExcludeId);
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
          <h1 className="text-2xl font-medium">
            Edit Lesson in {course.name} (id: {course.id})
          </h1>
          <form onSubmit={handleSubmitCreateLesson}>
            <div>
              <label htmlFor="id">Lesson ID</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="id"
                placeholder="Lesson ID"
                value={lessonData.id}
                disabled
              />
            </div>
            <div>
              <label htmlFor="name">Lesson Name</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="name"
                placeholder="Lesson Name"
                value={lessonData.name}
                onChange={handleChangeLessonDataInput}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="block p-2 rounded border w-full"
                id="description"
                placeholder="Description"
                rows={4}
                value={lessonData.description}
                onChange={handleChangeLessonDataInput}
              />
            </div>
            <div>
              <p>Lesson Type</p>
              <div>
                <input
                  type="radio"
                  id="video"
                  value="video"
                  name="lessonType"
                  checked={lessonData.type === 'video'}
                  onChange={handleChangeLessonType}
                />
                <label htmlFor="video">Video</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="file"
                  value="file"
                  name="lessonType"
                  checked={lessonData.type === 'file'}
                  onChange={handleChangeLessonType}
                />
                <label htmlFor="file">File</label>
              </div>
            </div>
            <div>
              <label htmlFor="source">Lesson Source</label>
              <input
                type="text"
                className="block p-2 rounded border w-full"
                id="source"
                placeholder="Lesson Source"
                value={lessonData.source}
                onChange={handleChangeLessonDataInput}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-10 rounded p-2 bg-orange-500 text-white uppercase"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <p>Only admin can access this page.</p>;
  }
};

export default EditLesson;
