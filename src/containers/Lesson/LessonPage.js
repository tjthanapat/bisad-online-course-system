import React from 'react';

const LessonPage = (props) => {
  const { lessonId, lessons, course } = props;
  const lesson = lessons.find(item => item.id === lessonId);

  return (
    <div>
      <h1>{lesson.name}</h1>
      <p>id: {lesson.id}</p>
    </div>
  );
};

export default LessonPage;