import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import EditLesson from '../MangeCourse/EditLesson';
import LessonPage from './LessonPage';

const Lesson = (props) => {
  const { course, lessons, enrolled } = props;
  const params = useParams();
  const lessonId = params.lessonId;
  const lesson = lessons.find((item) => item.id === lessonId);

  return (
    <Routes>
      <Route
        path=""
        element={
          <LessonPage lesson={lesson} course={course} enrolled={enrolled} />
        }
      />
      <Route
        path="edit"
        element={<EditLesson lesson={lesson} course={course} />}
      />
    </Routes>
  );
};

export default Lesson;
