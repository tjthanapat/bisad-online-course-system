import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import LessonPage from './LessonPage';

const Lesson = (props) => {
  const { course, lessons } = props;
  const params = useParams();
  const lessonId = params.lessonId;

  return (
    <Routes>
      <Route
        path=""
        element={
          <LessonPage
            lessonId={lessonId}
            lessons={lessons}
            course={course}
          />
        }
      />
    </Routes>
  );
};

export default Lesson;
