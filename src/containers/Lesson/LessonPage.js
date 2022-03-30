import React from 'react';

const LessonPage = (props) => {
  const { lesson, course } = props;

  return (
    <div>
      <h1>{lesson.name}</h1>
      <p>
        id: {lesson.id} | course: {course.name}
      </p>
      <p>Description: {lesson.description}</p>
      <p>Type: {lesson.type}</p>
      {lesson.type === 'video' && (
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="400"
          src={lesson.source}
          frameBorder="0"
          allowFullScreen={true}
        />
      )}
      {lesson.type === 'file' && (
        <div>
          <p>
            Download:{' '}
            <a href={lesson.source} target="_blank">
              Click here
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonPage;
