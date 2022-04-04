import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// import { saveLearningLog } from '../../functions/learningLogAndProgress';

const LessonPage = (props) => {
  const auth = useAuth();
  const { lesson, course, enrolled } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saveLog = async () => {
      try {
        // await saveLearningLog(auth.user.uid, course.id, lesson.id);
        console.log('Saved learning log successfully.');
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (enrolled) {
      saveLog();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else if (auth.user.admin || enrolled) {
    return (
      <div>
        <Link to={`/course/${course.id}`}>Back to Course Page</Link>
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
  } else {
    return (
      <div>
        <p>
          You are not allowed to access this page since you've not enrolled to
          the course.
        </p>
        <Link to={`/course/${course.id}`}>Back to course page</Link>
      </div>
    );
  }
};

export default LessonPage;
